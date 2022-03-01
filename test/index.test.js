import {} from "../globals.js";
import {faker} from "@faker-js/faker";
import assert from "assert";
import User from "../database/Models/User.js";

function* getNewUser(count) {
    let cursor = 0;
    for (cursor; cursor < count; cursor++) {
        yield {
            login: faker.internet.email(),
            password: faker.internet.password(),
        }
    }
}

describe("Accounting", () => {

    afterEach(async () => {
        await User.destroy({where: {}, force: true});
    })

    it("creates users", async () => {
        const usersNumber = 100
        const users = getNewUser(usersNumber);
        let counter = 0;
        let done = false;
        do{
            const row = users.next();
            if(!row.done){
                counter ++;
                await User.create(row.value, {isNewRecord: true});
            }
            done = row.done;
        } while(!done)
        assert.strictEqual(counter, await User.count())
    })
})

