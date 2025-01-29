// categories.js
export const categories = {
    cosmetics: {
        title: 'Cosmetics',
        subcategories: [
            {
                key: 'skincare',
                valueEn: 'Skincare',
                valueFr: 'Soins de la peau',
                items: [
                    { key: 'cleansers', valueEn: 'Cleansers', valueFr: 'Nettoyants' },
                    { key: 'toners', valueEn: 'Toners', valueFr: 'Toniques' },
                    { key: 'moisturizers', valueEn: 'Moisturizers', valueFr: 'Hydratants' },
                    { key: 'serums', valueEn: 'Serums', valueFr: 'Sérums' },
                    { key: 'exfoliators', valueEn: 'Exfoliators', valueFr: 'Exfoliants' },
                    { key: 'masks', valueEn: 'Masks', valueFr: 'Masques' },
                    { key: 'sunscreens', valueEn: 'Sunscreens', valueFr: 'Écrans solaires' },
                    { key: 'eyeCreams', valueEn: 'Eye Creams', valueFr: 'Crèmes pour les yeux' },
                    { key: 'lipBalms', valueEn: 'Lip Balms', valueFr: 'Baumes à lèvres' }
                ]
            },
            {
                key: 'makeup',
                valueEn: 'Makeup',
                valueFr: 'Maquillage',
                items: [
                    { key: 'foundations', valueEn: 'Foundations', valueFr: 'Fondations' },
                    { key: 'concealers', valueEn: 'Concealers', valueFr: 'Correcteurs' },
                    { key: 'powders', valueEn: 'Powders', valueFr: 'Poudres' },
                    { key: 'blushes', valueEn: 'Blushes', valueFr: 'Blushs' },
                    { key: 'eyeshadows', valueEn: 'Eyeshadows', valueFr: 'Fards à paupières' },
                    { key: 'eyeliners', valueEn: 'Eyeliners', valueFr: 'Eyeliner' },
                    { key: 'mascaras', valueEn: 'Mascaras', valueFr: 'Mascaras' },
                    { key: 'lipsticks', valueEn: 'Lipsticks', valueFr: 'Rouges à lèvres' },
                    { key: 'lipGlosses', valueEn: 'Lip Glosses', valueFr: 'Gloss à lèvres' },
                    { key: 'settingSprays', valueEn: 'Setting Sprays', valueFr: 'Sprays fixants' }
                ]
            },
            {
                key: 'hairCare',
                valueEn: 'Hair Care',
                valueFr: 'Soins capillaires',
                items: [
                    { key: 'shampoos', valueEn: 'Shampoos', valueFr: 'Shampooings' },
                    { key: 'conditioners', valueEn: 'Conditioners', valueFr: 'Après-shampooings' },
                    { key: 'hairMasks', valueEn: 'Hair Masks', valueFr: 'Masques capillaires' },
                    { key: 'hairOils', valueEn: 'Hair Oils', valueFr: 'Huiles capillaires' },
                    { key: 'stylingProducts', valueEn: 'Styling Products', valueFr: 'Produits coiffants' },
                    { key: 'hairColor', valueEn: 'Hair Color', valueFr: 'Coloration capillaire' }
                ]
            },
            {
                key: 'bodyCare',
                valueEn: 'Body Care',
                valueFr: 'Soins du corps',
                items: [
                    { key: 'bodyWashes', valueEn: 'Body Washes', valueFr: 'Gels douche' },
                    { key: 'bodyLotions', valueEn: 'Body Lotions', valueFr: 'Laits corporels' },
                    { key: 'scrubs', valueEn: 'Scrubs', valueFr: 'Gommages' },
                    { key: 'handCreams', valueEn: 'Hand Creams', valueFr: 'Crèmes pour les mains' },
                    { key: 'footCreams', valueEn: 'Foot Creams', valueFr: 'Crèmes pour les pieds' }
                ]
            },
            {
                key: 'fragrances',
                valueEn: 'Fragrances',
                valueFr: 'Parfums',
                items: [
                    { key: 'perfumes', valueEn: 'Perfumes', valueFr: 'Parfums' },
                    { key: 'eauDeToilettes', valueEn: 'Eau de Toilettes', valueFr: 'Eaux de toilette' },
                    { key: 'bodyMists', valueEn: 'Body Mists', valueFr: 'Brumes corporelles' }
                ]
            },
            {
                key: 'mensGrooming',
                valueEn: 'Men’s Grooming',
                valueFr: 'Soins pour hommes',
                items: [
                    { key: 'shavingCreams', valueEn: 'Shaving Creams', valueFr: 'Crèmes à raser' },
                    { key: 'aftershaves', valueEn: 'Aftershaves', valueFr: 'Après-rasage' },
                    { key: 'beardOils', valueEn: 'Beard Oils', valueFr: 'Huiles pour barbe' },
                    { key: 'mensSkincare', valueEn: 'Men’s Skincare', valueFr: 'Soins pour hommes' }
                ]
            },
            {
                key: 'toolsAccessories',
                valueEn: 'Tools & Accessories',
                valueFr: 'Outils & Accessoires',
                items: [
                    { key: 'makeupBrushes', valueEn: 'Makeup Brushes', valueFr: 'Pinceaux de maquillage' },
                    { key: 'applicators', valueEn: 'Applicators', valueFr: 'Applicateurs' },
                    { key: 'sponges', valueEn: 'Sponges', valueFr: 'Éponges' },
                    { key: 'skincareTools', valueEn: 'Skincare Tools', valueFr: 'Outils de soin de la peau' }
                ]
            }
        ]
    },
    clothing: {
        title: 'Clothing',
        subcategories: [
            {
                key: 'womensClothing',
                valueEn: 'Women’s Clothing',
                valueFr: 'Vêtements pour femmes',
                items: [
                    { key: 'tops', valueEn: 'Tops', valueFr: 'Hauts' },
                    { key: 'dresses', valueEn: 'Dresses', valueFr: 'Robe' },
                    { key: 'skirts', valueEn: 'Skirts', valueFr: 'Jupes' },
                    { key: 'pantsJeans', valueEn: 'Pants & Jeans', valueFr: 'Pantalons & Jeans' },
                    { key: 'jacketsCoats', valueEn: 'Jackets & Coats', valueFr: 'Vestes & Manteaux' },
                    { key: 'sweaters', valueEn: 'Sweaters', valueFr: 'Pulls' },
                    { key: 'activewear', valueEn: 'Activewear', valueFr: 'Vêtements de sport' },
                    { key: 'sleepwear', valueEn: 'Sleepwear', valueFr: 'Vêtements de nuit' }
                ]
            },
            {
                key: 'mensClothing',
                valueEn: 'Men’s Clothing',
                valueFr: 'Vêtements pour hommes',
                items: [
                    { key: 'shirts', valueEn: 'Shirts', valueFr: 'Chemises' },
                    { key: 'tShirts', valueEn: 'T-Shirts', valueFr: 'T-Shirts' },
                    { key: 'pantsJeans', valueEn: 'Pants & Jeans', valueFr: 'Pantalons & Jeans' },
                    { key: 'jacketsCoats', valueEn: 'Jackets & Coats', valueFr: 'Vestes & Manteaux' },
                    { key: 'sweaters', valueEn: 'Sweaters', valueFr: 'Pulls' },
                    { key: 'suits', valueEn: 'Suits', valueFr: 'Costumes' },
                    { key: 'activewear', valueEn: 'Activewear', valueFr: 'Vêtements de sport' },
                    { key: 'sleepwear', valueEn: 'Sleepwear', valueFr: 'Vêtements de nuit' }
                ]
            },
            {
                key: 'kidsClothing',
                valueEn: 'Kids’ Clothing',
                valueFr: 'Vêtements pour enfants',
                items: [
                    { key: 'boysClothing', valueEn: 'Boys’ Clothing', valueFr: 'Vêtements pour garçons' },
                    { key: 'girlsClothing', valueEn: 'Girls’ Clothing', valueFr: 'Vêtements pour filles' },
                    { key: 'babyClothing', valueEn: 'Baby Clothing', valueFr: 'Vêtements pour bébés' },
                    { key: 'schoolUniforms', valueEn: 'School Uniforms', valueFr: 'Uniformes scolaires' }
                ]
            },
            {
                key: 'footwear',
                valueEn: 'Footwear',
                valueFr: 'Chaussures',
                items: [
                    { key: 'womensShoes', valueEn: 'Women’s Shoes', valueFr: 'Chaussures pour femmes' },
                    { key: 'mensShoes', valueEn: 'Men’s Shoes', valueFr: 'Chaussures pour hommes' },
                    { key: 'kidsShoes', valueEn: 'Kids’ Shoes', valueFr: 'Chaussures pour enfants' },
                    { key: 'sportsShoes', valueEn: 'Sports Shoes', valueFr: 'Chaussures de sport' },
                    { key: 'boots', valueEn: 'Boots', valueFr: 'Bottes' },
                    { key: 'sandals', valueEn: 'Sandals', valueFr: 'Sandales' }
                ]
            },
            {
                key: 'accessories',
                valueEn: 'Accessories',
                valueFr: 'Accessoires',
                items: [
                    { key: 'bagsPurses', valueEn: 'Bags & Purses', valueFr: 'Sacs & Pochettes' },
                    { key: 'belts', valueEn: 'Belts', valueFr: 'Ceintures' },
                    { key: 'scarves', valueEn: 'Scarves', valueFr: 'Écharpes' },
                    { key: 'hatsCaps', valueEn: 'Hats & Caps', valueFr: 'Chapeaux & Casquettes' },
                    { key: 'gloves', valueEn: 'Gloves', valueFr: 'Gants' },
                    { key: 'sunglasses', valueEn: 'Sunglasses', valueFr: 'Lunettes de soleil' }
                ]
            },
            {
                key: 'specialtyClothing',
                valueEn: 'Specialty Clothing',
                valueFr: 'Vêtements spécialisés',
                items: [
                    { key: 'formalWear', valueEn: 'Formal Wear', valueFr: 'Tenue de soirée' },
                    { key: 'sportswear', valueEn: 'Sportswear', valueFr: 'Vêtements de sport' },
                    { key: 'lingerie', valueEn: 'Lingerie', valueFr: 'Lingerie' },
                    { key: 'swimwear', valueEn: 'Swimwear', valueFr: 'Maillots de bain' }
                ]
            }
        ]
    },
    jewelry: {
        title: 'Jewelry',
        subcategories: [
            {
                key: 'necklaces',
                valueEn: 'Necklaces',
                valueFr: 'Colliers',
                items: [
                    { key: 'chains', valueEn: 'Chains', valueFr: 'Chaînes' },
                    { key: 'pendants', valueEn: 'Pendants', valueFr: 'Pendants' },
                    { key: 'lockets', valueEn: 'Lockets', valueFr: 'Médaillons' }
                ]
            },
            {
                key: 'earrings',
                valueEn: 'Earrings',
                valueFr: 'Boucles d\'oreilles',
                items: [
                    { key: 'studs', valueEn: 'Studs', valueFr: 'Clous' },
                    { key: 'hoops', valueEn: 'Hoops', valueFr: 'Créoles' },
                    { key: 'dropEarrings', valueEn: 'Drop Earrings', valueFr: 'Boucles pendantes' }
                ]
            },
            {
                key: 'braceletsBangles',
                valueEn: 'Bracelets & Bangles',
                valueFr: 'Bracelets & Bracelets rigides',
                items: [
                    { key: 'cuffs', valueEn: 'Cuffs', valueFr: 'Bracelets' },
                    { key: 'charmBracelets', valueEn: 'Charm Bracelets', valueFr: 'Bracelets à charms' },
                    { key: 'bangles', valueEn: 'Bangles', valueFr: 'Bracelets rigides' }
                ]
            },
            {
                key: 'rings',
                valueEn: 'Rings',
                valueFr: 'Bagues',
                items: [
                    { key: 'engagementRings', valueEn: 'Engagement Rings', valueFr: 'Bagues de fiançailles' },
                    { key: 'weddingBands', valueEn: 'Wedding Bands', valueFr: 'Alliances' },
                    { key: 'fashionRings', valueEn: 'Fashion Rings', valueFr: 'Bagues de mode' }
                ]
            },
            {
                key: 'watches',
                valueEn: 'Watches',
                valueFr: 'Montres',
                items: [
                    { key: 'womensWatches', valueEn: 'Women’s Watches', valueFr: 'Montres pour femmes' },
                    { key: 'mensWatches', valueEn: 'Men’s Watches', valueFr: 'Montres pour hommes' },
                    { key: 'smartwatches', valueEn: 'Smartwatches', valueFr: 'Montres connectées' }
                ]
            },
            {
                key: 'broochesPins',
                valueEn: 'Brooches & Pins',
                valueFr: 'Broches & Épingles',
                items: [
                    { key: 'decorativeBrooches', valueEn: 'Decorative Brooches', valueFr: 'Broches décoratives' },
                    { key: 'lapelPins', valueEn: 'Lapel Pins', valueFr: 'Épingles à revers' }
                ]
            },
            {
                key: 'jewelrySets',
                valueEn: 'Jewelry Sets',
                valueFr: 'Ensembles de bijoux',
                items: [
                    { key: 'matchingSets', valueEn: 'Matching Necklace & Earring Sets', valueFr: 'Ensembles assortis' },
                    { key: 'completeSets', valueEn: 'Complete Sets', valueFr: 'Ensembles complets' }
                ]
            }
        ]
    }
};
