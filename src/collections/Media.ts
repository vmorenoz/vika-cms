import {CollectionConfig} from "payload/types";

export const Media: CollectionConfig = {
    slug: 'media',
    fields: [
        {
            name: "alt",
            type: "text",
        },
    ],
    access: {
        create: () => true,
        read: () => true,
        delete: () => true,
        update: () => true,
    },
    upload: {
        staticURL: '/media',
        staticDir: 'media',
        imageSizes: [
            {
                name: 'sm',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'md',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'lg',
                width: 1024,
                height: null,
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
    },
    endpoints: [
        {
            path: '/upload',
            method: 'post',
            handler: async (req, res, next) => {
                console.log(req.files);
                res.status(200).json('File was uploaded');
            }
        }
    ]
};