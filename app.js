// impor
const yargs = require('yargs')
const {saveContact, listContact, detailContact, deleteContact} = require ('./contacts.js')

//comand
yargs.command({
    command: 'add',
    describe: 'menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        nohp: {
            describe: 'No Hp',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        saveContact(argv.nama, argv.email, argv.nohp)
    }
}).demandCommand()

// menampilkan nama + no hp daftar kontak
yargs.command({
    command: 'list',
    describe: 'menampilkan semua nama dan no hp dari daftar kontak',
    handler(){
        listContact();
    }
})

// menampilkan detail sebuah kontak
yargs.command({
    command: 'detail',
    describe: 'menampilkan detail kontak',
    builder: {
        nama:{
            describe: 'Nama Lengkap',
            demandOption: 'true',
            type: 'string'
        }
    },
    handler(argv){
        detailContact(argv.nama)
    }
})

//delete contact
yargs.command({
    command: 'delete',
    describe:'delete contact',
    builder:{
        nama:{
            describe: 'Nama Lengkap',
            demandOption: 'true',
            type: 'string'
        }
    },
    handler(argv){
        deleteContact(argv.nama)
    }
})

yargs.parse();