import {Block, CollectionConfig} from "payload/types";

const MeasureUnitCompatibles: Block = {
    slug: 'measure-unit-compatible', // required
    fields: [
        {
            name: 'measure-unit',
            type: 'relationship',
            relationTo: 'measure-units',
            required: true,
        },
        {
            name: 'operation-type', // required
            type: 'select', // required
            options: [
                {
                    label: 'Multiply',
                    value: 'multiply',
                },
                {
                    label: 'Divide',
                    value: 'divide',
                },
            ],
        },
        {
            name: 'operation-value',
            type: 'number',
        },
    ]
};

export const MeasureUnits: CollectionConfig = {
    slug: 'measure-units',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'symbol',
            type: 'text',
            required: true,
        },
        {
            name: 'compatibles', // required
            type: 'blocks', // required
            minRows: 0,
            maxRows: 5,
            blocks: [ // required
                MeasureUnitCompatibles
            ]
        }
    ]
};