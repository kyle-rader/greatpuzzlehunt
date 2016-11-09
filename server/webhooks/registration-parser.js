"use strict";
import 'babel-register';
import _ from 'lodash'

class cashnetJSON {
    constructor(cnj) {
        let { itemcnt } = cnj;
        let refs = this.refs(cnj);
        this.batchNumber = cnj['batchno'];
        this.primaryContact = {
            "email": cnj['MA3-PUEMAIL'],
            "name": cnj['MA3-PUNAME']
        };
        this.participants = this.getParticipants(refs);
        this.tshirts = this.getTshirts(refs);
        this.transaction = cnj['tx'];
        this.totalAmount = this.getTotalAmount(refs);
    }
    refs(cnj) {
        let { itemcnt } = cnj;
        let refArray = [];
        _.forEach(_.range(1, _.toInteger(itemcnt) + 1), function (index) {
            refArray.push({});
            refArray[index - 1]['amount'] = cnj[`amount${index}`];
            refArray[index - 1]['qty'] = cnj[`qty${index}`];
        });
        let refRE = /ref(\d{1,2})type(\d{1,2})/;
        _.forEach(_.keys(cnj), function (value) {
            let REresult = refRE.exec(value);
            if (REresult) {
                refArray[_.toInteger(REresult[2]) - 1][cnj[REresult[0]]] = cnj[`ref${REresult[1]}val${REresult[2]}`];
            }
        });
        return refArray;
    }
    getParticipants(refs) {
        let participants = [];
        _.forEach(refs, function (object) {
            if (object['MA3-REGFEE']) {
                participants.push({
                    "address": object['ADDR1'],
                    "city": object['CITY'],
                    "state": object['STATE'],
                    "zip": object['ZIP'],
                    "age": _.parseInt(object['MA3-AGE']),
                    "email": object['G_EMAIL1'],
                    "name": object['MA3_NAME'],
                    "phone": object['G_PHONE1'],
                    "isAdult": object['MA3-HH2_A'] == 'Adult',
                    "registrationType": object['MA3-REGFEE'].toLowerCase(),
                    "photoPermission": object["MA3-HH1"] == "Yes"
                });
            }
        });
        return participants;
    }
    getTshirts(refs) {
        let tshirts = [];
        _.forEach(refs, function(object) {
            if (object['MA3-STYLE']) {
                let tshirt = {
                    "amount": _.parseInt(object['amount']),
                    "qty": _.parseInt(object['qty']),
                    "fontColor": object['MA3_FONTCOLOR'],
                    "gender": object['MA3-STYLE'],
                    "size": object['MA3_SIZE'],
                    "mensColor": (object['MA3_MCOLOR'] == 'n/a' ? null : object['MA3_MCOLOR']),
                    "womansColor": (object['MA3_LCOLOR'] == 'n/a' ? null : object['MA3_LCOLOR'])
                }
                tshirt['isValid'] = (tshirt['mensColor'] && tshirt.gender == 'MENS' || tshirt['womansColor'] && tshirt.gender == 'LADIES');
                tshirts.push(tshirt);
            }
        });
        return tshirts;
    }
    getTotalAmount(refs) {
        let sum = 0;
        _.forEach(refs, function(object) {
            sum += parseFloat(object['amount']);
        });
        return sum;
    }
}
module.exports = cashnetJSON;
