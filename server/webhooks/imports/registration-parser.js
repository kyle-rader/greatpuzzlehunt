import { times, keys, parseInt } from 'lodash';

export default class RegistrationParser {
  constructor(jsonBody) {
    const refs = this.refs(jsonBody);
    this.batchNumber = jsonBody['batchno'];
    this.primaryContact = {
      'email': jsonBody['MA3-PUEMAIL'],
      'name': jsonBody['MA3-PUNAME'],
    };
    this.participants = this.getParticipants(refs);
    this.tshirts = this.getTshirts(refs);
    this.transaction = jsonBody['tx'];
    this.totalAmount = this.getTotalAmount(refs);
  }

  refs(jsonBody) {
    const { itemcnt } = jsonBody;
    let refArray = new Array(parseInt(itemcnt));
    times(parseInt(itemcnt), (i) => {
      refArray[i] = {
        amount: jsonBody[`amount${i + 1}`],
        qty: jsonBody[`qty${i + 1}`],
      };
    });
    let referenceRE = /^ref(\d+)type(\d+)$/;
    keys(jsonBody).map((key) => {
      let result = referenceRE.exec(key);
      if (result) {
        let referenceIndex = parseInt(result[2]) - 1;
        refArray[referenceIndex][jsonBody[key]] = jsonBody[`ref${result[1]}val${result[2]}`];
      }
    });
    return refArray;
  }

  getParticipants(refs) {
    return refs.reduce((participants, object) => {
      if (object['MA3-REGFEE']) {
        participants.push({
          'address': object['ADDR1'],
          'city': object['CITY'],
          'state': object['STATE'],
          'zip': object['ZIP'],
          'age': parseInt(object['MA3-AGE']),
          'email': object['G_EMAIL1'],
          'name': object['MA3_NAME'],
          'phone': object['G_PHONE1'],
          'isAdult': object['MA3-HH2_A'] == 'Adult',
          'registrationType': object['MA3-REGFEE'].toLowerCase(),
          'photoPermission': object['MA3-HH1'] == 'Yes',
        });
      }
      return participants;
    }, []);
  }

  getTshirts(refs) {
    return refs.reduce((tshirts, object) => {
      if (object['MA3-STYLE']) {
        let tshirt = {
          'amount': parseInt(object['amount']),
          'qty': parseInt(object['qty']),
          'fontColor': object['MA3_FONTCOLOR'],
          'gender': object['MA3-STYLE'],
          'size': object['MA3_SIZE'],
          'mensColor': (object['MA3_MCOLOR'] == 'n/a' ? null : object['MA3_MCOLOR']),
          'womansColor': (object['MA3_LCOLOR'] == 'n/a' ? null : object['MA3_LCOLOR']),
        };
        tshirt.isValid = true == ((tshirt['mensColor'] && tshirt.gender == 'MENS') || (tshirt['womansColor'] && tshirt.gender == 'LADIES'));
        if (tshirt.gender == 'LADIES') {
          tshirt.isValid = tshirt.isValid && tshirt.size != '3XL';
        }
        tshirts.push(tshirt);
      }
      return tshirts;
    }, []);
  }

  getTotalAmount(refs) {
    return refs.reduce((sum, object) => {
      return sum + parseFloat(object.amount);
    }, 0);
  }
}
