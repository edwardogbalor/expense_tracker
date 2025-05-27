import { mergeTypeDefs } from "@graphql-tools/merge"; 

import userTypeDef from "./users.typeDef.js"
import transactionTypeDef from "./transaction.typeDef.js"

const mergedTypeDefs = mergeTypeDefs([userTypeDef,transactionTypeDef])

export default mergedTypeDefs;