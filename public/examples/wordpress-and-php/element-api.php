<?php

use craft\commerce\elements\Product;
use craft\commerce\elements\Variant;
use craft\commerce\elements\Order;
use craft\elements\Entry;
use craft\elements\User;
use craft\commerce\services\States;
use craft\helpers\StringHelper;

return [
    'endpoints' => [

        'api/carseats' => function() {
            return [
                'elementType' => Entry::class,
                'criteria' => [
                    'section' => 'productPages',
                    'type' => 'carSeat'
                ],
                'transformer' => function(Entry $entry) {
                    $product = $entry->product->one();
                    
                    return [
                        'id' => $entry->id,
                        'specs' => [
                            'heightMax' => $entry->heightMaxIn,
                            'heightMin' => $entry->heightMinIn,
                            'weightMax' => $entry->weightMaxLbs,
                            'weightMin' => $entry->weightMinLbs,
                            'shoulderMax' => $entry->seatedShoulderHeightMaxIn,
                            'shoulderMin' => $entry->seatedShoulderHeightMinIn,
                        ]
                    ];
                },
            ];
        },

        'api/states.json' => function() {
            return [
                'elementType' => States::class,
                'transformer' => function(States $states) {
                    return [
                        'states' => $states->allEnabledStatesAsListGroupedByCountryId
                    ];
                }
            ];
        },
        
        'api/user/info' => function() {
            return [
                'elementType' => User::class,
                'criteria' => [
                    'id' => Craft::$app->getUser()->getIdentity()->getId()
                ],
                'transformer' => function(User $user) {
                    return [
                        'user' => $user->firstName ? $user->firstName : $user->username,
                        'wishlist' => $user->wishlist->ids()
                    ];
                }
            ];
        },

        'api/products/search' => function() {
            return [
                'elementType' => Product::class,
                'paginate' => false,
                'pretty' => true,
                'criteria' => [
                    'limit' => 10,
                    'search' => Craft::$app->request->getParam('q')
                ],
                'transformer' => function(Product $product) {
                    return [
                        'title' => $product->title,
                        'variants' => $product->variants,
                        'id' => $product->id,
                        'url' => $product->url
                    ];
                }
            ];
        },

        'api/pages/search' => function() {
            $criteria = [
                // 'section' => 'and, not product', 
                'limit' => 10,
                'search' => Craft::$app->request->getParam('q')
            ];

            return [
                'elementType' => Entry::class,
                'criteria' => $criteria,
                'transformer' => function(Entry $entry) {
                $entrySection = $entry->section->handle;
                $entryType = $entry->type->handle;

                    return [
                        'title' => $entry->title,
                        'url' => $entry->url,
                        'query' => Craft::$app->request->getParam('q'),
                        'type' => $entryType,
                        'section' => $entrySection,
                    ];
                }
            ];
        },

        'api/page/<entryId:\d+>.json' => function($entryId) {
            return [
                'elementType' => Entry::class,
                'criteria' => ['id' => $entryId],
                'one' => true,
                'transformer' => function(Entry $entry) {
                return [
                    'title' => $entry->title,
                    'url' => $entry->url
                ];
                },
            ];
        },

        'api/product/<productId:\d+>' => function($productId) {
            return [
                'elementType' => Product::class,
                'pretty' => false,
                'paginate' => false,
                'criteria' => ['id' => $productId],
                'transformer' => function( Product $product ) {
                    return [$product];
                }
            ];
        },

        'api/variant-specs/<variantId:\d+>' => function($variantId) {
            return [
                'elementType' => Variant::class,
                'pretty' => false,
                'paginate' => false,
                'criteria' => ['id' => $variantId],
                'transformer' => function( Variant $variant ) {
                    return $variant['bscraftWebsiteProductSpecs'];
                }
            ];
        },

        'api/stories/<storyId:\d+>' => function($storyId) {
            Craft::$app->config->general->__set('generateTransformsBeforePageLoad', 'true');
            // $state = Craft::$app->request->getParam('state');
            
            return [
                'elementType' => Entry::class,
                'pretty' => false,
                'paginate' => false,
                'criteria' => ['id' => $storyId],
                'transformer' => function(Entry $story) {
                    $image = $story->storyImage->one();
                    $product = $story->storyProduct->one();
                    $productImage = $product->productCardImage->one();
                    // $productType = $product->productType->one();

                    return [
                        'id' => $story->id,
                        'title' => $story->title,
                        'name' => $story->storyAuthor,
                        'location' => $story->location,
                        'body' => $story->body,
                        'product' => $product ? [
                            'id' => $product->id,
                            'title' => $product->title,
                            'productCardImage' => $productImage ? $productImage->getUrl('storyProductImage') : null,
                            // 'category' => $productType ? $productType->title : null,
                            'type' => $product->type->name,
                            'uri' => $product->url,
                        ] : null,
                        'image' => $image ? Craft::$app->assets->getAssetUrl($image, 'storyImageTransform', true) : null,
                    ];
                }
            ];
        },

        'api/product-recall-serials' => function() {
            return [
                'elementType' => Entry::class,
                'paginate' => false,
                'criteria' => ['section' => 'safetyNoticesAndRecalls'],
                'transformer' => function(Entry $entry) {
                    $affectedMatrix = $entry->affectedSerialNumbers->all();
                    $affectedNumbersFieldsData = [];

                    foreach ($affectedMatrix as $block) {
                        switch ($block->type->handle) {
                            case 'modelsSerials':
                                $removedHTML = preg_replace('#<[^>]+>#', ',', $block->serialNumbers);
                                $removedLBR = preg_replace('/\r|\n/', '', $removedHTML);

                                $affectedNumbersFieldsData[] =  array_filter(explode(",", $removedLBR));
                                break;
                        };
                    };
                    
                    return [
                        'title' => $entry->title,
                        'url' => $entry->url,
                        'affected' => $affectedNumbersFieldsData
                    ];
                }
            ];
        }

    ]
];
