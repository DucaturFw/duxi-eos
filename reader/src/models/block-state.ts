import { prop, Typegoose } from 'typegoose';
import {
  Hash,
  Name,
  AccountName,
  DateString,
  Signature,
  HexData,
  Address,
  TransactionState
} from './scalars';

export class BlockState extends Typegoose {
  @prop({ required: true })
  block_id: Hash;
  @prop({ required: true })
  block_header_state: {
    id: Hash;
    block_num: number;
    header: {
      timestamp: DateString;
      producer: AccountName;
      confirmed: number;
      previous: Hash;
      transaction_mroot: Hash;
      action_mroot: Hash;
      schedule_version: number;
      header_extensions: any[];
      producer_signature: Signature;
    };
    dpos_proposed_irreversible_blocknum: number;
    dpos_irreversible_blocknum: number;
    bft_irreversible_blocknum: number;
    pending_schedule_lib_num: number;
    pending_schedule_hash: Hash;
    pending_schedule: { version: number; producers: any[] };
    active_schedule: {
      version: 0;
      producers: Array<{
        producer_name: AccountName;
        block_signing_key: Address;
      }>;
    };
    blockroot_merkle: {
      _active_nodes: Hash[];
      _node_count: 1;
    };
    producer_to_last_produced: Array<[AccountName, number]>;
    producer_to_last_implied_irb: Array<[AccountName, number]>;
    block_signing_key: Address;
    confirm_count: any[];
    confirmations: any[];
  };
  @prop({ required: true })
  block_num: number;
  @prop({ required: true })
  createdAt: DateString;
  @prop({ required: true })
  in_current_chain: boolean;
  @prop({ required: true })
  validated: boolean;
}
