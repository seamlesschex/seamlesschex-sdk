const Seamlesschex = require('./../seamlesschex');

(async () => {
  const seamlesschex = new Seamlesschex('sk_test_01en8e264mt148md2f8xkx6afs');
  const errorHandler = err => console.log('err: ', err.response);

  //Retrieve a check - check_id: 0025e120-ae7f-11eb-876b-8793bcc5ce7e
  const objCheck = await seamlesschex.checks.get('0025e120-ae7f-11eb-876b-8793bcc5ce7e')
    .catch(errorHandler);
  console.log('objCheck: ', objCheck);

  //Retrieve bank information - bank_routing:021000021
  const objBankInfo = await seamlesschex.checks.getBankInfo('021000021')
    .catch(errorHandler);
  console.log('objBankInfo: ', objBankInfo);

  //List all checks - query: ?limit=15&page=1&sort=date&direction=DESC
  const listChecks = await seamlesschex.checks.list({ limit: 15, page: 1, sort: 'date', direction: 'DESC'  })
    .catch(errorHandler);
  console.log('listChecks: ', listChecks);

  //Create a check without token
  const checkSecurityData = {
    "bank_account": "5354070829"
  } ;
  const objCreatedCheck = await seamlesschex.checks.create({
    "number": Number(String(Date.now()).substr(-10)), // unique check number
    "amount": 100 ,
    "memo": "Law Office Robert Aaron, FL" ,
    "name": "Robert Aaron" ,
    "email": "robertaaron@example.com" ,
    "authorization_date": "2020-07-22" ,
    "label": "Label" ,
    "phone": "1728514288" ,
    "address": "3881 Coquina Ave" ,
    "city": "North Port" ,
    "state": "FL" ,
    "zip": "34286" ,
    "bank_routing": "021000021" ,
    "recurring": 1 ,
    "recurring_cycle": "week" ,
    "recurring_start_date": "2025-07-25" ,
    "recurring_installments": 3 ,
    "verify_before_save": true ,
    "fund_confirmation": false,
    ...checkSecurityData
  })
    .catch(errorHandler);
  console.log('objCreatedCheck: ', objCreatedCheck);

  // Update a check
  const objUpdatedCheck = await seamlesschex.checks.update({ ...objCreatedCheck.check, ...checkSecurityData, amount: 200 })
    .catch(errorHandler);
  console.log('objUpdatedCheck: ', objUpdatedCheck);

  //Void a check
  const objVoidedCheck = await seamlesschex.checks.void(objCreatedCheck.check.check_id)
    .catch(errorHandler);
  console.log('objVoidedCheck: ', objVoidedCheck);

  //Tokenization
  const store = 'site.com'
  const objToken = await seamlesschex.tokens.create({
    "first_name": "Robert" ,
    "last_name": "Aaron" ,
    "email": "robertaaron@example.com" ,
    "phone": "1728514288" ,
    "bank_account": "5354070829" ,
    "bank_routing": "021000021" ,
    "store": store
  }).catch(errorHandler);
  console.log('objToken: ', objToken);

  //Create a check with token
  const objTokenCheck = await seamlesschex.checks.create({
    "number": Number(String(Date.now()).substr(-10)), // unique check number
    "amount": 100 ,
    "memo": "Law Office Robert Aaron, FL" ,
    "name": "Robert Aaron" ,
    "email": "robertaaron@example.com" ,
    "token": objToken.tokenization.token,
    "store": store
  })
    .catch(errorHandler);
  console.log('objTokenCheck: ', objTokenCheck);

})();

