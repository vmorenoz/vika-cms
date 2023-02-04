import {buildConfig} from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import {Categories, Types} from "./collections/Categories";
import {Media} from "./collections/Media";
import {Products} from "./collections/Products";
import {MeasureUnits} from "./collections/MeasureUnits";
import {PurchaseItems, Purchases} from "./collections/Purchases";
import {SaleItems, Sales} from "./collections/Sales";

export default buildConfig({
    serverURL: 'http://localhost:3000',
    admin: {
        user: Users.slug,
    },
    collections: [
        Users, Media, MeasureUnits,
        Categories, Types, Products,
        Purchases, PurchaseItems,
        Sales, SaleItems
    ],
    upload: {
        limits: {
            fileSize: 3000000,
        },
    },
    cors: '*',
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
});
