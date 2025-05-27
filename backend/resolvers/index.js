import { mergeResolvers } from "@graphql-tools/merge"; 
import userResolver from "./use.resolver";
import transactionResolver from "./transcation.resolver";

const mergedResolvers = mergeResolvers([userResolver, transactionResolver])