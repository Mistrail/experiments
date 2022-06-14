import '../globals.js';
import {Context} from "../environment/context.js";
import fs from 'fs';
d('Create new Sequelize model'.yellow);
d('1/2 Input model name:'.yellow);

const input = process.stdin;
const context = new Context();
let step = 0;

const createModel = async (context) => {
    const {modelName} = context;
    const filename = `./database/models/${modelName}.js`;

    const content = `import connection from '../connection.js'
import {Model, DataTypes, Op} from 'sequelize'

class ${modelName} extends Model {}

${modelName}.init({
        // fields here...        
    },
    {
        sequelize: connection,
        timestamps: true,
        paranoid: true,
        defaultScope: {
            where: {deletedAt: {[Op.is]: null}}
        }
    })

export default ${modelName};
`;

    const modelPatch = `\nexport {default as ${modelName}} from './models/${modelName}.js'`;
    fs.writeFileSync('./database/models.js', fs.readFileSync('./database/models.js') + modelPatch);
    fs.writeFileSync(filename, content);
    d('Done'.green.bold);
    process.exit(0)

}

input.on('data', async (data) => {
    if (step === 0) {
        context.bind({modelName: data.toString('utf8').trim()});
        d(context);
        d('2/2 Press [ENTER] to proceed:'.yellow);
    }
    if (step > 0) {
        await createModel(context);
    }
    step++;
})
