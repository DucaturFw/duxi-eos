// import { MongoActionReader } from 'demux-eos';
// import {
//   BaseActionWatcher,
//   AbstractActionHandler,
//   AbstractActionReader,
//   Updater,
//   Effect
// } from 'demux';

// import * as updaters from './updaters';
// import * as effects from './effects';

// export class ActionHandler extends AbstractActionHandler {
//   constructor(public updaters: Updater[], public effects: Effect[]) {
//     super(updaters, effects);
//   }
//   protected handleWithState(
//     handle: (state: any, context?: any) => void
//   ): Promise<void> {
//     throw new Error('Method not implemented.');
//   }
//   protected rollbackTo(blockNumber: number): Promise<void> {
//     throw new Error('Method not implemented.');
//   }
// }

import mongoose from 'mongoose';
import { prop, Typegoose } from 'typegoose';

export async function run() {
  console.log('Run Blocks app');
  console.log(mongoose);
  await mongoose.connect('mongodb://localhost/EOS');
  const TransactionModel = new Transaction().setModelForClass(Transaction, {
    schemaOptions: {
      collection: 'transactions'
    }
  });
  const transactions = await TransactionModel.find();
  console.log(transactions);
  // const connection = await connect('mongodb://localhost');
  // connection.
  // const nodeReader = new MongoActionReader();
  // const blocksHandler = new ActionHandler(updaters, effects);
  // const watcher = new BaseActionWatcher(
  //   <AbstractActionReader>(<any>nodeReader),
  //   blocksHandler,
  //   250
  // );
  // await new Promise(resolve => setTimeout(resolve, 1000));
}
