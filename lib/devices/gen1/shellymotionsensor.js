'use strict';

/**
 * Shelly Motion / SHMOS-01 / shellymotion
 * CoAP:
 *
 * CoAP Version >= 1.8
 *  Shelly Motion SHMOS-01:    {"blk":[{"I":1,"D":"sensor_0"},{"I":2,"D":"device"}],"sen":[{"I":6107,"T":"A","D":"motion","R":["0/1","-1"],"L":1},{"I":3119,"T":"S","D":"timestamp","U":"s","R":["U32","-1"],"L":1},{"I":3120,"T":"A","D":"motionActive","R":["0/1","-1"],"L":1},{"I":6110,"T":"A","D":"vibration","R":["0/1","-1"],"L":1},{"I":3106,"T":"L","D":"luminosity","R":["U32","-1"],"L":1},{"I":3111,"T":"B","D":"battery","R":["0/100","-1"],"L":2},{"I":9103,"T":"EVC","D":"cfgChanged","R":"U16","L":2}]}
 */
const shellymotionsensor = {
    'sensor.battery': {
        coap: {
            coap_publish: '3111',
        },
        mqtt: {
            mqtt_publish: 'shellies/<mqttprefix>/status',
            mqtt_publish_funct: value => (value ? JSON.parse(value).bat : undefined),
        },
        common: {
            name: {
                en: 'Battery capacity',
                de: 'Batteriekapazität',
                ru: 'Емкость батареи',
                pt: 'Capacidade da bateria',
                nl: 'Batterij capaciteit',
                fr: 'Capacité de la batterie',
                it: 'Capacità della batteria',
                es: 'Capacidad de la batería',
                pl: 'Pojemność baterii',
                'zh-cn': '包 容能力',
            },
            type: 'number',
            role: 'value.battery',
            read: true,
            write: false,
            min: 0,
            max: 100,
            unit: '%',
        },
    },
    'sensor.lux': {
        coap: {
            coap_publish: '3106',
        },
        mqtt: {
            mqtt_publish: 'shellies/<mqttprefix>/status',
            mqtt_publish_funct: value => (value ? JSON.parse(value).lux : undefined),
        },
        common: {
            name: {
                en: 'Illuminance',
                de: 'Helligkeit',
                ru: 'Освещенность',
                pt: 'Iluminancia',
                nl: 'Verlichtingssterkte',
                fr: 'lumineuse',
                it: 'Illuminazione',
                es: 'Iluminancia',
                pl: 'Podświetlenie',
                'zh-cn': '照度',
            },
            type: 'number',
            role: 'value.brightness',
            read: true,
            write: false,
            unit: 'Lux',
        },
    },
    'sensor.vibration': {
        coap: {
            coap_publish: '6110',
            coap_publish_funct: value => {
                return value != 0;
            },
        },
        mqtt: {
            mqtt_publish: 'shellies/<mqttprefix>/status',
            mqtt_publish_funct: value => (value ? JSON.parse(value).vibration : undefined),
        },
        common: {
            name: 'Vibration',
            type: 'boolean',
            role: 'sensor',
            read: true,
            write: false,
        },
    },
    'sensor.motion': {
        coap: {
            coap_publish: '6107',
            coap_publish_funct: value => value === 1,
        },
        mqtt: {
            mqtt_publish: 'shellies/<mqttprefix>/status',
            mqtt_publish_funct: value => (value ? JSON.parse(value).motion : undefined),
        },
        common: {
            name: 'Motion',
            type: 'boolean',
            role: 'sensor.motion',
            read: true,
            write: false,
        },
    },
};

module.exports = {
    shellymotionsensor,
};
