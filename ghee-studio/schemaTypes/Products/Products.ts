export default {
    name: 'product',
    title: 'Products',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Product Name',
        type: 'string',
        validation: (Rule: any) => Rule.required().min(2).max(100),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
      },
      {
        name: 'offerpercentage',
        title: 'Offer Price',
        type: 'number',
      },
      {
        name: 'instock',
        title: 'In Stock',
        type: 'boolean',
      },
      {
        name: 'ratings',
        title: 'Ratings',
        type: 'number',
      },
      {
        name: 'ratingStar',
        title: 'Rating Star',
        type: 'number',
        options: {
          maxLength: 5,
        },
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'price',
        title: 'Prices',
        type: 'array',
        of: [{ type: 'number' }],
        validation: (Rule: any) =>
          Rule.required()
            .min(1)
            .custom((prices : any, context : any) => {
              const quantities = context.document?.quantitysize;
              if (quantities && prices && quantities.length !== prices.length) {
                return 'Prices and Quantities arrays must be the same length';
              }
              return true;
            }),
      },
      {
        name: 'quantitysize',
        title: 'Quantity Sizes',
        type: 'array',
        of: [{ type: 'number' }],
        validation: (Rule : any) =>
          Rule.required()
            .min(1)
            .custom((quantities : any, context:any) => {
              const prices = context.document?.price;
              if (prices && quantities && prices.length !== quantities.length) {
                return 'Quantities and Prices arrays must be the same length';
              }
              return true;
            }),
      },
      {
        name: 'quantity',
        title: 'Default Quantity',
        type: 'number',
        validation: (Rule:any) =>
          Rule.custom((defaultQuantity:any, context: any) => {
            const quantities = context.document?.quantitysize || [];
            if (!quantities.includes(defaultQuantity)) {
              return 'Default quantity must be one of the values in the Quantities array';
            }
            return true;
          }),
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
            type: 'image',
            fields: [
              {
                name: 'caption',
                type: 'string',
                title: 'Caption',
                options: {
                  isHighlighted: true,
                },
              },
            ],
            options: {
              hotspot: true,
            },
          },
        ],
      }
      
    ],
  };
  