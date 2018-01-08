import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { map, extend, omit } from 'lodash';
import { sendTickets } from '../../lib/imports/sendTickets';

export default function processTransaction(txData) {
  Meteor.logger.info(`Processing transaction "${txData.tx}" from ${txData.email}`);
  Meteor.logger.logobj(txData);
  const studentTickets = parseInt(txData.studentTickets);
  const nonStudentTickets = parseInt(txData.nonStudentTickets);

  createTickets(txData.tx, txData.email, 'STUDENT', studentTickets);
  createTickets(txData.tx, txData.email, 'NONSTUDENT', nonStudentTickets);

  sendTickets(txData.tx, txData.email);
};

function createTickets(tx, email, type, qty) {
  for (let i = 0; i < qty; i++) { createTicket(tx, email, type); }
};

function createTicket(tx, email, type) {
  // 1. Generate new code
  let newCode = makeCode(type);

  // 2. While this code is already in use, generate another
  while (Boolean(Tickets.findOne({ code: newCode }))) {
    newCode = makeCode(type);
  }

  // 3. Create ticket
  Tickets.insert({
    tx: tx,
    boughtBy: email,
    type: type,
    code: newCode,
    redeemed: false,
    redeemedBy: null,
  });
};

function makeCode(type) {
  return `${type}${Random.hexString(10)}`.toUpperCase();
};
