import { mergeResolvers } from "@graphql-tools/merge"; 
import userResolver from "./user.resolver.js";
import transactionResolver from "./transcation.resolver.js";

const mergedResolvers = mergeResolvers([userResolver, transactionResolver])

export default mergedResolvers;