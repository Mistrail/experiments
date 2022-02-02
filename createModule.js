import fs from 'fs';

const files = {
    t: `import GQL from "graphql";
const {GraphQLObjectType} = GQL;

export const Type = new GraphQLObjectType({
    name: '%name%',
    fields: ({
        //fields description
    })
})

`,
    q: `import {Type} from "./Type.js";
import GQL from "graphql";
const {} = GQL;

export const Query = {}
`,
    m: `import {Type} from "./Type.js";
import GQL from "graphql";
const {GraphQLString} = GQL;

export const Mutation = {}
`,
    s: `import {Type} from "./Type.js";
import GQL from "graphql";
const {GraphQLString} = GQL;

export const Subscribe = {}
`,
    r: `export const Resolve = {}    
`,
}

const filenames = {
    t: 'Type.js',
    q: 'Query.js',
    m: 'Mutation.js',
    s: 'Subscribe.js',
    r: 'Resolve.js',
}

function getParams () {
    const vars = Object.keys(process.env).filter(key => /^npm_config/.test(key));
    const possibleKeys = ['npm_config_keys', 'npm_config_name']
    const config = vars.reduce((accum, field) => {
        if(possibleKeys.includes(field)){
            const name = field.replace('npm_config_', '');
            return Object.assign(accum, {[name]: process.env[field]})
        }else{
            return accum
        }
    }, {});

    if(!config["name"]){
        throw new Error("name required");
    }

    if(!config["keys"]){
        config["keys"] = "qtmsr";
    }
    config["keys"] = config["keys"].split("");
    return config;
}
const params = getParams();
const dirname = `gqlSchema/${params.name}`

if(!fs.existsSync(dirname)){
    fs.mkdirSync(dirname,  {recursive: true})
}

const exportData = [];
params.keys.forEach(key => {
    const fileName = `${dirname}/${filenames[key]}`;
    exportData.push(`export * from './${filenames[key]}';`);
    const content = files[key].replace(/%name%/g, params.name);
    fs.writeFileSync(fileName, content)
})

fs.writeFileSync(`${dirname}/module.js`, exportData.join('\n'));
d(dirname)
