import BN from 'bn.js';
import {
  BlockchainUtils,
  BlockchainApiConnection,
} from '@kiltprotocol/chain-helpers';
import { makeTransfer } from '@kiltprotocol/core/lib/balance/Balance.chain';

import { signTransfer, submitTransfer } from './transferChannels';

import { decryptIdentity } from '../../utilities/identities/identities';

jest.mock('@kiltprotocol/core/lib/balance/Balance.chain');
jest.mock('@kiltprotocol/chain-helpers', () => ({
  BlockchainApiConnection: {
    getConnectionOrConnect: jest.fn(),
  },
  BlockchainUtils: {
    submitSignedTx: jest.fn(),
  },
}));
jest.mock('../../utilities/identities/identities', () => ({
  decryptIdentity: jest.fn(),
}));

const signedTxMock = {
  hash: {
    toHex() {
      return 'Signed tx hash';
    },
  },
};

const chainMock = {
  signTx: jest.fn().mockResolvedValue(signedTxMock),
};

(BlockchainApiConnection.getConnectionOrConnect as jest.Mock).mockResolvedValue(
  chainMock,
);

describe('transferChannels', () => {
  describe('signTransferChannel', () => {
    it('should respond to the the proper messages', async () => {
      (decryptIdentity as jest.Mock).mockImplementation(() => ({
        sdkIdentity: true,
      }));
      (makeTransfer as jest.Mock).mockImplementation(() => ({
        transaction: true,
      }));

      const txHash = await signTransfer({
        address: 'identity-address',
        recipient: 'recipient-address',
        amount: new BN(125000000),
        password: 'password',
        tip: new BN(0),
      });

      expect(decryptIdentity).toHaveBeenCalledWith(
        'identity-address',
        'password',
      );
      expect(makeTransfer).toHaveBeenCalledWith(
        'recipient-address',
        expect.anything(),
      );
      expect(chainMock.signTx).toHaveBeenCalledWith(
        { sdkIdentity: true },
        { transaction: true },
        expect.anything(),
      );
      expect(txHash).toEqual({ hash: 'Signed tx hash' });
    });
  });
  describe('submitTransferChannel', () => {
    it('should respond to the proper messages', async () => {
      await submitTransfer('Signed tx hash');
      expect(BlockchainUtils.submitSignedTx).toHaveBeenCalledWith(
        signedTxMock,
        expect.anything(),
      );
    });
  });
});