// core module

//file system
const fs = require("fs");
const chalk = require("chalk")
const validator = require("validator")
const { rejects } = require("assert");
const { resolve } = require("path");

//cek direktori data
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

const dataPath = './data/contact.json'
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const loadContact = () =>{
    const fileBufer = fs.readFileSync("data/contact.json", "utf-8");
    const contacts = JSON.parse(fileBufer);

    return contacts
}

const saveContact = (nama, email, nohp) =>{
    const contact = {nama, email, nohp}
    const contacts = loadContact()

    //cek duplikat
    const duplicate = contacts.find((contact) =>{
        return contact.nama === nama
    })

    if (duplicate) {
        console.log(chalk.bgRed('Contact sudah terdaftar, gunakan nama lain!'))
        return false
    }

    if(!validator.isEmail(email)){
        console.log(chalk.bgRed('Email tidak valid! Harus format email'))
        return false
    }

    if (!validator.isMobilePhone(nohp, 'id-ID')) {
        console.log(chalk.bgRed('Nomor hp tidak valid'))
        return false
    }

    contacts.push(contact);
    fs.writeFileSync("data/contact.json", JSON.stringify(contacts))
    console.log(chalk.bgGreenBright('terima kasih telah memasukkan data'))
}

const listContact = () =>{
    const contacts = loadContact()
    console.log(chalk.bgCyan.inverse.bold("Daftar Kontak: "))
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.nohp}`)
    });
}

const detailContact = (nama) =>{
    const contacts = loadContact()
    console.log(chalk.bgCyan.inverse.bold('Detail Kontak:'))
    
    const contactsFind = contacts.filter((contact) =>{
        return contact.nama.toLowerCase() === nama.toLowerCase()
    })

    if (contactsFind.length === 0) {
        console.log(chalk.bgYellow.bold(`Kontak ${nama} tidak ditemukan`))
        return false
    }

    // console.log(`${contactsFind.nama} - ${contactsFind.email} - ${contactsFind.nohp}`)
    contactsFind.forEach((contact, i) => {
        console.log(`${i+1} - ${contact.nama} - ${contact.email} - ${contact.nohp}`)
    });
}

const deleteContact = (nama) =>{
    const contacts = loadContact()
    
    const newContacts = contacts.filter((contact) => {
        return contact.nama.toLowerCase() !== nama.toLowerCase()
    })

    if (contacts.length === newContacts.length){
        console.log(chalk.bgRed.bold(`${nama} tidak ditemukan`))
        return false
    }

    fs.writeFileSync("data/contact.json", JSON.stringify(contacts))
    console.log(chalk.bgGreenBright(`Kontak ${nama} berhasil dihapus`))

}

module.exports = {
 saveContact, listContact, detailContact, deleteContact
}