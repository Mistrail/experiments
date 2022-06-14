import '../globals.js';
import {Context} from "../environment/context.js";
import fs from 'fs';
d('Create new GraphQL module'.yellow);
d('1/5 Input module name:'.yellow);

const input = process.stdin;
const context = new Context();
let step = 0;

const createModule = async (context) => {
    const {moduleName} = context;
    const dir = `./gqlSchema/${moduleName}`;
    try {
        fs.mkdirSync(dir, {recursive: true});
        d(`Directory ${dir} created`);
    } catch (ex) {
        e(ex);
        return;
    }
    const typeContent = [
        'import GQL from \'graphql\'',
        'const {GraphQLObjectType, GraphQLID} = GQL',
        '',
        `export const Type = new GraphQLObjectType({`,
        `\tname: '${moduleName}',`,
        '\tfields: ({',
        '\t\n',
        '\t})',
        '})'
    ];

    const contentModule = [
        `export * from './Type.js';`
    ];

    try {
        fs.writeFileSync(`${dir}/Type.js`, typeContent.join('\n'));
        d(`file ${dir}/Type.js created`);
    } catch (ex) {
        e(ex)
        return;
    }

    if(context.query){
        await createQuery(context);
        contentModule.push(`export * from './Query.js'`);
    }

    if(context.mutation){
        await createMutation(context);
        contentModule.push(`export * from './Mutation.js'`);
    }

    if(context.subscription){
        await createSubscription(context);
        contentModule.push(`export * from './Subscribe.js'`);
    }

    fs.writeFileSync(`${dir}/module.js`, contentModule.join('\n'));
    d(`file ${dir}/module.js created`);
    d('Done'.green.bold)

}

const createQuery = async (context) => {
    const dir = `./gqlSchema/${context.moduleName}`;
    const content = `import {Type} from \'./Type.js\';
import GQL from \'graphql\';
const {} = GQL; //import types here

export const Query = {
    //fieldName: {type: ..., resolve: (root, args, ctx, info) => {...}, ...}    
}`;

    fs.writeFileSync(`${dir}/Query.js`, content);
    d(`file ${dir}/Query.js created`);
}

const createMutation = async (context) => {
    const dir = `./gqlSchema/${context.moduleName}`;
    const content = `import {Type} from \'./Type.js\';
import GQL from \'graphql\';
import {ApolloError} from "apollo-server";
const {} = GQL;  //import types here

export const Mutation = {
    //fieldName: {type: ..., args: {...}, resolve: (root, args, ctx, info) => {...}, ...}    
}`;

    fs.writeFileSync(`${dir}/Mutation.js`, content);
    d(`file ${dir}/Mutation.js created`);
}

const createSubscription = async (context) => {
    const dir = `./gqlSchema/${context.moduleName}`;
    const content = `import {Type} from \'./Type.js\';
import GQL from \'graphql\';
const {} = GQL; //import types here

export const Subscribe = {}`;

    fs.writeFileSync(`${dir}/Subscribe.js`, content);
    d(`file ${dir}/Subscribe.js created`);
}

input.on('data', async (data) => {
    if (step === 0) {
        context.bind({moduleName: data.toString('utf8').trim()});
        d('2/5 Create query? [y/n]:'.yellow);
    }
    if (step === 1) {
        d('3/5 Create mutation? [y/n]:'.yellow);
        context.bind({query: data.toString('utf8').trim().toLowerCase() === 'y'});
    }
    if (step === 2) {
        d('4/5 Create subscription? [y/n]:'.yellow);
        context.bind({mutation: data.toString('utf8').trim().toLowerCase() === 'y'});
    }
    if (step === 3) {
        context.bind({subscription: data.toString('utf8').trim().toLowerCase() === 'y'});
        d(context);
        d('5/5 Press [ENTER] to proceed:'.yellow);
    }
    if (step > 3) {
        await createModule(context);
        process.exit(0);
    }
    step++;
})
