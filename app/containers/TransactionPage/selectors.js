import formatMoney from 'lib/formatMoney';
import decodeMessage from 'lib/decodeMessage';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTransactionPageDomain = state =>
  state.get('transactionPage', initialState);

const makeSelectTransaction = () =>
  createSelector(selectTransactionPageDomain, globalState => {
    const transaction = globalState.get('transaction').toJS();
    transaction.prettyData = Object.assign({}, transaction.data);

    if (transaction.data.wires) {
      transaction.prettyData.wires = [];
      transaction.data.wires.forEach(wire => {
        transaction.prettyData.wires.push(Object.assign({}, wire));
      });
    }

    if (transaction.data.type === 'send_many') {
      const targetAddress = [];
      let amount = 0;
      transaction.prettyData.wires.forEach(wire => {
        const target = wire;
        targetAddress.push(target.target_address);
        amount += parseInt(target.amount, 10);
        target.amount = `${formatMoney(target.amount)} ADS`;
        let nodeId = target.target_node.toString(16);
        while (nodeId.length < 4) {
          nodeId = `0${nodeId}`;
        }
        target.target_node_id = nodeId;
      });

      transaction.prettyData.target_address = targetAddress.join(', ');
      transaction.prettyData.amount = `${formatMoney(amount)} ADS`;
    } else if (transaction.data.type === 'send_one') {
      transaction.prettyData.amount = `${formatMoney(
        transaction.data.amount,
      )} ADS`;
      let nodeId = transaction.data.target_node.toString(16);
      while (nodeId.length < 4) {
        nodeId = `0${nodeId}`;
      }
      transaction.prettyData.target_node_id = nodeId;
    }

    if (transaction.data.sender_fee) {
      transaction.prettyData.sender_fee = `${formatMoney(
        transaction.data.sender_fee,
      )} ADS`;
    }

    if (transaction.data.message) {
      transaction.prettyData.decoded_message = decodeMessage(
        transaction.data.message,
      );
    }

    return transaction;
  });

export { makeSelectTransaction };
