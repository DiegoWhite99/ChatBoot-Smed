const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['0', 'volver al menu pricipal']).addAnswer()

const flowOpcion1 = addKeyword(['1']).addAnswer(
    [
        ' hola soy smedy 🤖 y te voy a yudar a agendar tu cita \n porfavor ingresa al siguinte link',
        
        'https://forms.gle/bqSX7BEqniUFD9q16',   
    ],
    null,
    null,
    [flowSecundario]
)

const flowOpciondos = addKeyword(['2']).addAnswer(
    [
        '🚀 Uno de nuestros asesores se contactará, para ayudarte con tus dudas en la brevedad, gracias por tu paciencia! 😀',],
    null,
    null,
    [flowSecundario]
)

const flowOpciontres = addKeyword(['3']).addAnswer(
    ['Uno de nuestros asesores se contactará, para ayudarte con tus dudas en la brevedad, gracias por tu paciencia! 😀'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'ola', 'buenas'])
    .addAnswer('Hola! Soy smedy 🤖 el asistente virtual de *SMED TECHNOLOGY*')
    .addAnswer(
        [
                'Por favor seleccione alguna de estas opciones:\n',
                '📅 *1*.Programa una cita de servicio técnico.',
                '👨‍💻 *2*.Para solicitar una asesoría',
                '📃 *3*.Solicitar nuestro catálogo de productos',
                '📱👨‍💻 *4*.Comunicarte con un asesor',
                
        ],
        null,
        null,
        [flowOpcion1, flowOpciondos,flowOpciontres]
    )


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
