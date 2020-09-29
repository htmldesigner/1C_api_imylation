const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const path = require('path');

class Users {

    constructor(name, phone, iin) {
        this.name = name
        this.phone = phone
        this.iin = iin
        this.id = uuidv4()
    }

    async save(){
         const users = await Users.getAll()
         users.push(this.toJSON())
         
         return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'base.json'), 
                JSON.stringify(users, null, ' '),
                (err) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve()
                    }
                }
            )
         })
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
            phone: this.phone,
            iin: this.iin
        }
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'base.json'), 'utf-8', (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }

    static async checkUserByIIN(iin){
        const users = await Users.getAll()
        return users.find(user => user.iin === iin)
    }


}

module.exports = Users