import { PlantType } from '../types';

export const EXHAUSTIVE_PLANT_CATALOG: PlantType[] = [
  {
    id: 'cherry_tomato',
    name: 'Cherry Tomato',
    scientificName: 'Solanum lycopersicum var. cerasiforme',
    category: 'Vegetable',
    description: 'Sweet, productive, and fast-growing tomato variety. Excellent for small space container gardening and a classic favorite for Earthbox. Must be grown with an Earthbox standard trellis or dynamic frame support.',
    climbingFrameRequired: true,
    climbingFrameType: 'Cage/Trellis Frame (Standard Sturdy Cage or Staking Rail)',
    shadeRequirement: 'Full Sun',
    waterConsumption: 'Extreme',
    waterGallonsPerWeekLocal: 6.5,
    daysToHarvest: 65,
    daysToSprout: 7,
    recommendedPlantingSeason: 'Spring (Post last-frost) to Early Summer',
    earthboxLayout: {
      rows: 1,
      plantsPerRow: 2,
      totalPlants: 2,
      fertilizerBand: 'side',
      diagramPoints: [
        { x: 25, y: 50 },
        { x: 75, y: 50 }
      ],
      instructions: 'Plant exactly 2 tomato starts in the center of the box along the length. Place your 2-cup fertilizer band along the opposite side from the water tube.'
    },
    stages: [
      {
        dayRange: [1, 10],
        name: 'Seedling Sprout',
        description: 'First cotyledon leaves emerge from the soil. Taproot accesses moisture reservoir.',
        careTips: 'Keep soil moist around stem. Ensure maximum overhead sunlight to prevent leggy growth.',
        illustrationSeed: 'cotyledon',
        heightInches: 2
      },
      {
        dayRange: [11, 25],
        name: 'Early Vegetative',
        description: 'True jagged tomato leaves form. The branch system begins extending, and main stalk thickens.',
        careTips: 'Fasten gently to the lower rungs of the trellis or climbing frame using soft garden twine.',
        illustrationSeed: 'veg_early',
        heightInches: 8
      },
      {
        dayRange: [26, 45],
        name: 'Flowering Stage',
        description: 'Yellow blossoms emerge. First signs of minor side shoots (suckers) appearing in leaf axils.',
        careTips: 'Prune select suckers below the first blossom cluster to direct energy upward. Gently shake vines to aid pollination.',
        illustrationSeed: 'flower',
        heightInches: 22
      },
      {
        dayRange: [46, 65],
        name: 'Harvest Maturity',
        description: 'Clusters of spherical cherry tomatoes change from pale green, to orange, and finally deep ruby red.',
        careTips: 'Keep reservoir topped off daily as extreme water usage peak occurs. Pick daily to encourage continuous production.',
        illustrationSeed: 'fruit',
        heightInches: 42
      }
    ]
  },
  {
    id: 'bell_pepper',
    name: 'Bell Pepper',
    scientificName: 'Capsicum annuum',
    category: 'Vegetable',
    description: 'Sweet bell peppers do remarkably well in the double-row layout. They produce crisp, thick-walled fruits and require minimal pruning.',
    climbingFrameRequired: false,
    climbingFrameType: 'Single support stakes to handle heavy fruit payload if desired',
    shadeRequirement: 'Full Sun',
    waterConsumption: 'High',
    waterGallonsPerWeekLocal: 4.8,
    daysToHarvest: 75,
    daysToSprout: 10,
    recommendedPlantingSeason: 'Late Spring / Warm Soils',
    earthboxLayout: {
      rows: 2,
      plantsPerRow: 3,
      totalPlants: 6,
      fertilizerBand: 'center',
      diagramPoints: [
        { x: 20, y: 25 },
        { x: 50, y: 25 },
        { x: 80, y: 25 },
        { x: 20, y: 75 },
        { x: 50, y: 75 },
        { x: 80, y: 75 }
      ],
      instructions: 'Plant 6 peppers in two parallel rows of three. Place the fertilizer band exactly down the center, between the two rows.'
    },
    stages: [
      {
        dayRange: [1, 12],
        name: 'Tiny Shoot',
        description: 'Two broad, shiny heart-shaped seed leaves break the mulch casing.',
        careTips: 'Protect from hard driving rains. Maintain warm moisture in the upper soil.',
        illustrationSeed: 'cot_pepper',
        heightInches: 1.5
      },
      {
        dayRange: [13, 30],
        name: 'Robust Canopy',
        description: 'Broad dark-green leaves stack in pairs forming a compact, dense bush shape.',
        careTips: 'Mulch properly around the planting slots to preserve moisture. Do not pinch the main grow tip.',
        illustrationSeed: 'veg_pepper',
        heightInches: 7
      },
      {
        dayRange: [31, 55],
        name: 'White Blossoms',
        description: 'Star-shaped white flowers point downwards, preparing to drop petals and push peppers out.',
        careTips: 'Water must remain consistent. Drought now will cause blossom end rot or flower drop.',
        illustrationSeed: 'flower_pepper',
        heightInches: 15
      },
      {
        dayRange: [56, 75],
        name: 'Sweet Harvesting',
        description: 'Peppers expand, turning dark glossy green and shifting to vibrant yellow or sweet red.',
        careTips: 'Snip bell peppers cleanly with shears rather than pulling, to avoid breaking fragile branches.',
        illustrationSeed: 'fruit_pepper',
        heightInches: 24
      }
    ]
  },
  {
    id: 'slicing_cucumber',
    name: 'Slicing Cucumber',
    scientificName: 'Cucumis sativus',
    category: 'Vegetable',
    description: 'Cucumbers grow rapidly and climb heavily. Highly efficient in sub-irrigated setups as they are water-intensive and prone to yellowing on standard irrigation.',
    climbingFrameRequired: true,
    climbingFrameType: 'Climbing Trellis (Absolute Necessity - Vines climb rapidly via tendrils)',
    shadeRequirement: 'Full Sun',
    waterConsumption: 'High',
    waterGallonsPerWeekLocal: 5.5,
    daysToHarvest: 55,
    daysToSprout: 5,
    recommendedPlantingSeason: 'Spring or Late Summer',
    earthboxLayout: {
      rows: 1,
      plantsPerRow: 4,
      totalPlants: 4,
      fertilizerBand: 'side',
      diagramPoints: [
        { x: 15, y: 50 },
        { x: 38, y: 50 },
        { x: 62, y: 50 },
        { x: 85, y: 50 }
      ],
      instructions: 'Plant 4 cucumber starts in a single row along the centerline. Direct their initial growth towards the trellis structure.'
    },
    stages: [
      {
        dayRange: [1, 7],
        name: 'Fast Cotyledon',
        description: 'Large, thick, paddle-shaped seed leaves push open the soil cover dramatically.',
        careTips: 'Ensure birds do not pluck the fresh fleshy seedlings.',
        illustrationSeed: 'cot_cuke',
        heightInches: 2.5
      },
      {
        dayRange: [8, 20],
        name: 'Tendril Expansion',
        description: 'Rough, sandpaper-textured leaves unfurl as thin, spiral-seeking search tendrils twist into the air.',
        careTips: 'Guide the first tendrils manually onto your Earthbox trellis mesh to train them upward.',
        illustrationSeed: 'veg_cuke',
        heightInches: 10
      },
      {
        dayRange: [21, 40],
        name: 'Golden Flowers',
        description: 'Flourishing vines produce numerous yellow flowers. Female blossoms have miniature cucumbers at their base.',
        careTips: 'Maintain water reservoir capacity. Bees must have access to pollinate male and female flowers.',
        illustrationSeed: 'flower_cuke',
        heightInches: 28
      },
      {
        dayRange: [41, 55],
        name: 'Crisp Picking',
        description: 'Heavy cylindrical dark-green cucumbers hang from vines. High water levels ensure non-bitter skin.',
        careTips: 'Harvest regularly. Leaving massive cucumbers on the vine shuts down further flower production.',
        illustrationSeed: 'fruit_cuke',
        heightInches: 50
      }
    ]
  },
  {
    id: 'sweet_basil',
    name: 'Sweet Basil',
    scientificName: 'Ocimum basilicum',
    category: 'Herb',
    description: 'An aromatic delight that thrives inside sub-irrigated system. Constant moisture from bottom-up delivery develops rich, lush foliage with high oil content.',
    climbingFrameRequired: false,
    shadeRequirement: 'Partial Shade',
    waterConsumption: 'Moderate',
    waterGallonsPerWeekLocal: 3.2,
    daysToHarvest: 45,
    daysToSprout: 6,
    recommendedPlantingSeason: 'Late Spring through Summer',
    earthboxLayout: {
      rows: 2,
      plantsPerRow: 3,
      totalPlants: 6,
      fertilizerBand: 'center',
      diagramPoints: [
        { x: 20, y: 25 },
        { x: 50, y: 25 },
        { x: 80, y: 25 },
        { x: 20, y: 75 },
        { x: 50, y: 75 },
        { x: 80, y: 75 }
      ],
      instructions: 'Plant 6 basil starts in two rows. Place the fertilizer band exactly down the center, between the rows.'
    },
    stages: [
      {
        dayRange: [1, 8],
        name: 'Aromatic Shoot',
        description: 'Perfect rounded seedlings appear, giving off a tiny whiff of spice when touched.',
        careTips: 'Water gently, avoid wetting the foliage excessively during midday hot sun.',
        illustrationSeed: 'cot_basil',
        heightInches: 1
      },
      {
        dayRange: [9, 22],
        name: 'Branching Bush',
        description: 'Spoon-shaped glossy basil leaves emerge. Compact branching occurs as node distances stay tight.',
        careTips: 'Pinch off the top set of leaves when the seedling has 3 to 4 nodes to force bushy lateral growth.',
        illustrationSeed: 'veg_basil',
        heightInches: 5
      },
      {
        dayRange: [23, 35],
        name: 'Lush Foliage',
        description: 'Dense canopy of beautiful edible leaves. Stems thicken and woodiness is prevented by constant picking.',
        careTips: 'Pinch any flower stalks immediately. Basil flower heads make the leaves bitter and stop vegetative growth.',
        illustrationSeed: 'flower_basil',
        heightInches: 12
      },
      {
        dayRange: [36, 45],
        name: 'Continuous Harvest',
        description: 'A massive, fragrant bush ready for continuous pruning. Excellent for fresh pesto or culinary plates.',
        careTips: 'Always harvest leaves from the top down, cutting above a leaf node where two small shoots are growing.',
        illustrationSeed: 'fruit_basil',
        heightInches: 18
      }
    ]
  },
  {
    id: 'japanese_eggplant',
    name: 'Japanese Eggplant',
    scientificName: 'Solanum melongena',
    category: 'Vegetable',
    description: 'Slender, sweet, non-bitter eggplants that thrive on warm, constant moisture. Highly attractive purple foliage and star-shaped lavender blossoms make it highly ornamental.',
    climbingFrameRequired: false,
    climbingFrameType: 'Inconspicuous wooden stake or stakes to support heavy fruits later',
    shadeRequirement: 'Full Sun',
    waterConsumption: 'High',
    waterGallonsPerWeekLocal: 4.5,
    daysToHarvest: 65,
    daysToSprout: 8,
    recommendedPlantingSeason: 'Spring (Post last-frost)',
    earthboxLayout: {
      rows: 1,
      plantsPerRow: 2,
      totalPlants: 2,
      fertilizerBand: 'side',
      diagramPoints: [
        { x: 25, y: 50 },
        { x: 75, y: 50 }
      ],
      instructions: 'Plant exactly 2 eggplants in the centerline. Place your fertilizer strip along the opposite side from the water tube.'
    },
    stages: [
      {
        dayRange: [1, 9],
        name: 'Sprout Phase',
        description: 'Lance-like seed leaves push up, quickly developing a subtle purple hue along their stems.',
        careTips: 'Ensure warmth is maintained. Eggplants stunt easily under cold spring night dampness.',
        illustrationSeed: 'cot_egg',
        heightInches: 1.8
      },
      {
        dayRange: [10, 25],
        name: 'Velvet Foliage',
        description: 'Broad, velvety, deeply ribbed leaves sprout. The plant assumes a sturdy upright branching structure.',
        careTips: 'Look out for early flea beetles. Consider soft organic soap spray if tiny holes appear on leaves.',
        illustrationSeed: 'veg_egg',
        heightInches: 7
      },
      {
        dayRange: [26, 48],
        name: 'Lavender Stars',
        description: 'Aesthetic violet, five-point blossoms appear. Golden yellow anthers glow in the center of the flowers.',
        careTips: 'Flick blossoms gently with a finger to distribute pollen inside. Consistent water level prevents flower drop.',
        illustrationSeed: 'flower_egg',
        heightInches: 16
      },
      {
        dayRange: [49, 65],
        name: 'Glossy Harvest',
        description: 'Long, slim, purplish-black Japanese eggplants dangle gracefully. Surface skin glows like fine lacquer.',
        careTips: 'Cut with hand shears leaving an inch of thorny cap attached. Do not pluck or tear the fruit stem.',
        illustrationSeed: 'fruit_egg',
        heightInches: 26
      }
    ]
  },
  {
    id: 'romaine_lettuce',
    name: 'Romaine Lettuce',
    scientificName: 'Lactuca sativa var. longifolia',
    category: 'Vegetable',
    description: 'Crisp heads of delicious salad romaine. Exceptionally easy in an Earthbox. High density layout allows continuous harvest of outer baby leaves.',
    climbingFrameRequired: false,
    shadeRequirement: 'Partial Shade',
    waterConsumption: 'Low',
    waterGallonsPerWeekLocal: 2.2,
    daysToHarvest: 55,
    daysToSprout: 4,
    recommendedPlantingSeason: 'Cool seasons (Early Autumn or Early Spring)',
    earthboxLayout: {
      rows: 2,
      plantsPerRow: 4,
      totalPlants: 8,
      fertilizerBand: 'center',
      diagramPoints: [
        { x: 15, y: 25 },
        { x: 38, y: 25 },
        { x: 62, y: 25 },
        { x: 85, y: 25 },
        { x: 15, y: 75 },
        { x: 38, y: 75 },
        { x: 62, y: 75 },
        { x: 85, y: 75 }
      ],
      instructions: 'Plant 8 lettuce seedlings in parallel rows of four. Pour your fertilizer band precisely along the center line between rows.'
    },
    stages: [
      {
        dayRange: [1, 7],
        name: 'Delicate Green',
        description: 'Delicate circular leaves emerge. Extremely fast to start in cooler moist soil.',
        careTips: 'Shelter from intense mid-day heat. Lettuce seeds struggle above 85°F (30°C).',
        illustrationSeed: 'cot_lettuce',
        heightInches: 1
      },
      {
        dayRange: [8, 20],
        name: 'Baby Rosette',
        description: 'Ruffled outer leaves begin extending outward from a central dynamic crown.',
        careTips: 'Check reservoir to ensure it is constantly damp but not muddy. Add organic fish fertilizer if growing pale.',
        illustrationSeed: 'veg_lettuce',
        heightInches: 4
      },
      {
        dayRange: [21, 40],
        name: 'Crisp Heart Fold',
        description: 'Foliage wraps tightly inward, creating the tall upright elongated head characteristic of romaine.',
        careTips: 'Harvest outer leaves as baby greens anytime, or wait for the whole head to mature.',
        illustrationSeed: 'flower_lettuce', // Using keyword but representing leafy development
        heightInches: 8
      },
      {
        dayRange: [41, 55],
        name: 'Full Salad Head',
        description: 'Dense, chunky, 10-inch columns of crunchy pale-green ribs and emerald leaf caps.',
        careTips: 'Harvest in the early cool morning by slicing the head off at soil level. Morning harvest keeps leaves sweet.',
        illustrationSeed: 'fruit_lettuce',
        heightInches: 11
      }
    ]
  },
  {
    id: 'bush_beans',
    name: 'Bush Green Beans',
    scientificName: 'Phaseolus vulgaris',
    category: 'Vegetable',
    description: 'High-yielding green beans that grow as compact shrubs without winding trellis poles. Highly recommended for children, providing rich crops in minimal weeks.',
    climbingFrameRequired: false,
    shadeRequirement: 'Full Sun',
    waterConsumption: 'Moderate',
    waterGallonsPerWeekLocal: 3.5,
    daysToHarvest: 50,
    daysToSprout: 6,
    recommendedPlantingSeason: 'Mid Spring or Mid Summer',
    earthboxLayout: {
      rows: 2,
      plantsPerRow: 5,
      totalPlants: 10,
      fertilizerBand: 'center',
      diagramPoints: [
        { x: 10, y: 25 },
        { x: 30, y: 25 },
        { x: 50, y: 25 },
        { x: 70, y: 25 },
        { x: 90, y: 25 },
        { x: 10, y: 75 },
        { x: 30, y: 75 },
        { x: 50, y: 75 },
        { x: 70, y: 75 },
        { x: 90, y: 75 }
      ],
      instructions: 'Plant 10 bean seeds in two rows of five. Lay the fertilizer band exactly down the center, between the rows.'
    },
    stages: [
      {
        dayRange: [1, 8],
        name: 'Arching Loop',
        description: 'Bent pale stems arch hook-like out of the soil, pulling massive seed halves which snap open as cotyledons.',
        careTips: 'Do not disturb the soil as they rise, bean seeds push up with immense muscular leverage.',
        illustrationSeed: 'cot_bean',
        heightInches: 3
      },
      {
        dayRange: [9, 22],
        name: 'Trifoliate Mound',
        description: 'Compact bush shapes form. Leaves sprout in signature three-panel clusters, creating a robust shield.',
        careTips: 'Brush leaves gently to prompt gas exchange, beans enjoy air movement and sun penetration.',
        illustrationSeed: 'veg_bean',
        heightInches: 9
      },
      {
        dayRange: [23, 38],
        name: 'Lilac Flowers',
        description: 'Charming white, pink, or pale lilac orchid-like blossoms nestle quietly within the leaf clusters.',
        careTips: 'Do not overfeed nitrogen now, otherwise you get infinite leaves but zero beans. Let the Earthbox organic strip run.',
        illustrationSeed: 'flower_bean',
        heightInches: 15
      },
      {
        dayRange: [39, 50],
        name: 'Bountiful Shells',
        description: 'Hundreds of bright, straight, crisp bean snaps hang down below the canopy. Ready for rapid steam or fresh snaps.',
        careTips: 'Pick every single bean that is pencil-thin to trigger the plant to produce flowers and beans recursively.',
        illustrationSeed: 'fruit_bean',
        heightInches: 18
      }
    ]
  },
  {
    id: 'beefsteak_tomato',
    name: 'Beefsteak Tomato',
    scientificName: 'Solanum lycopersicum \'Beefsteak\'',
    category: 'Vegetable',
    description: 'A classic, mammoth-fruiting heirloom tomato. Produces rich, solid, meaty slices. Highly popular but heavy; absolutely requires a premium heavy trellis or cage.',
    climbingFrameRequired: true,
    climbingFrameType: 'Heavy-duty tomatoes staking pole or robust commercial cage frame',
    shadeRequirement: 'Full Sun',
    waterConsumption: 'Extreme',
    waterGallonsPerWeekLocal: 7.2,
    daysToHarvest: 80,
    daysToSprout: 7,
    recommendedPlantingSeason: 'Mid-Spring (Post last-frost) to Summer',
    earthboxLayout: {
      rows: 1,
      plantsPerRow: 2,
      totalPlants: 2,
      fertilizerBand: 'side',
      diagramPoints: [
        { x: 25, y: 50 },
        { x: 75, y: 50 }
      ],
      instructions: 'Position 2 strong Beefsteak starts. The extreme roots will tap the sub-irrigation well rapidly.'
    },
    stages: [
      {
        dayRange: [1, 9],
        name: 'Robust Sprout',
        description: 'Strong fleshy seedlings rise, showing sturdy stems.',
        careTips: 'Ensure bright direct warm light. Do not let soil dry completely.',
        illustrationSeed: 'cot_beef_tomat',
        heightInches: 2.5
      },
      {
        dayRange: [10, 30],
        name: 'Heavy Foliage',
        description: 'Thick branches expand, developing compound leaves with high hair density.',
        careTips: 'Tie primary shoot to your sturdy frame every 6 inches.',
        illustrationSeed: 'veg_beef_tomat',
        heightInches: 12
      },
      {
        dayRange: [31, 55],
        name: 'Giant Blossoms',
        description: 'Clusters of large yellow flowers open. They are larger than cherry tomato blossoms.',
        careTips: 'Flick flowers gently during dry hours to activate internal pollination.',
        illustrationSeed: 'flower_beef_tomat',
        heightInches: 28
      },
      {
        dayRange: [56, 80],
        name: 'Mammoth Harvest',
        description: 'Gigantic, multi-ribbed green globes slowly change to bright red, soft-skinned beauties.',
        careTips: 'Support heavy clusters to prevent the stems from snapping of their own weight.',
        illustrationSeed: 'fruit_beef_tomat',
        heightInches: 48
      }
    ]
  },
  {
    id: 'jalapeno_pepper',
    name: 'Jalapeno Pepper',
    scientificName: 'Capsicum annuum \'Jalapeño\'',
    category: 'Vegetable',
    description: 'Incomparable, high-yielding spicy peppers with compact shrub structures. They love warm soil and persistent sub-irrigated water wells.',
    climbingFrameRequired: false,
    shadeRequirement: 'Full Sun',
    waterConsumption: 'High',
    waterGallonsPerWeekLocal: 4.5,
    daysToHarvest: 72,
    daysToSprout: 8,
    recommendedPlantingSeason: 'Spring to Summer',
    earthboxLayout: {
      rows: 2,
      plantsPerRow: 3,
      totalPlants: 6,
      fertilizerBand: 'center',
      diagramPoints: [
        { x: 20, y: 25 },
        { x: 50, y: 25 },
        { x: 80, y: 25 },
        { x: 20, y: 75 },
        { x: 50, y: 75 },
        { x: 80, y: 75 }
      ],
      instructions: 'Plant 6 peppers in two rows of three. Run the solid slow-release fertilizer strip down the center.'
    },
    stages: [
      {
        dayRange: [1, 10],
        name: 'Spear Seedling',
        description: 'Small heart-like glossy green caps poke through the cover.',
        careTips: 'Requires consistent moderate warmth. Minimum 65°F optimal.',
        illustrationSeed: 'cot_jalapeno',
        heightInches: 1.2
      },
      {
        dayRange: [11, 28],
        name: 'Green Umbrella',
        description: 'Forms a tight, highly symmetrical umbrella-like canopy of deep-green leaves.',
        careTips: 'Weed out any stray grasses. Do not overwater from the top container surface.',
        illustrationSeed: 'veg_jalapeno',
        heightInches: 6
      },
      {
        dayRange: [29, 50],
        name: 'Star Blown',
        description: 'White nodding blooms transition, showing tiny green cone pins in centers.',
        careTips: 'Never let the water line go dry now; peppers need constant moisture to keep fruit sweet and hot.',
        illustrationSeed: 'flower_jalapeno',
        heightInches: 13
      },
      {
        dayRange: [51, 72],
        name: 'Fiery Pickings',
        description: 'Crispy thick-walled jalapeños expand, displaying fine stretch marks. Pick green or leave to ripen red.',
        careTips: 'Wear garden gloves when clipping fruits to prevent spicy oils from contacting eyes.',
        illustrationSeed: 'fruit_jalapeno',
        heightInches: 22
      }
    ]
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    scientificName: 'Fragaria × ananassa',
    category: 'Fruit',
    description: 'Delicious everbearing strawberries. The unique double-row sub-irrigated Earthbox keeps the fruit dry and elevated away from mud, reducing decay.',
    climbingFrameRequired: false,
    shadeRequirement: 'Full Sun',
    waterConsumption: 'Moderate',
    waterGallonsPerWeekLocal: 3.8,
    daysToHarvest: 60,
    daysToSprout: 12,
    recommendedPlantingSeason: 'Early Spring or Autumn setup',
    earthboxLayout: {
      rows: 2,
      plantsPerRow: 3,
      totalPlants: 6,
      fertilizerBand: 'center',
      diagramPoints: [
        { x: 20, y: 25 },
        { x: 50, y: 25 },
        { x: 80, y: 25 },
        { x: 20, y: 75 },
        { x: 50, y: 75 },
        { x: 80, y: 75 }
      ],
      instructions: 'Plant 6 everbearing strawberry crowns. They will grow into a compact lush trailing visual mound.'
    },
    stages: [
      {
        dayRange: [1, 12],
        name: 'Runner Emergence',
        description: 'Tender serrated trifoliate leaves start spreading from the central root crown.',
        careTips: 'Do not bury the crown; keep it level with the soil line.',
        illustrationSeed: 'cot_strawberry',
        heightInches: 2
      },
      {
        dayRange: [13, 28],
        name: 'Rosette Expansion',
        description: 'Lush dark green clumps form, with short leaf stalks spreading outwards.',
        careTips: 'Pinch early runners (long leafless stems) to direct plant energy into strong crown roots.',
        illustrationSeed: 'veg_strawberry',
        heightInches: 5
      },
      {
        dayRange: [29, 45],
        name: 'White Petals',
        description: 'Charming white five-petal flowers with dense yellow button centers open in clusters.',
        careTips: 'Bees are key. Make sure the container is open to friendly garden insects.',
        illustrationSeed: 'flower_strawberry',
        heightInches: 8
      },
      {
        dayRange: [46, 60],
        name: 'Sweet Ruby Berries',
        description: 'Berry caps swell from green to light white, before flushing into glowing, sweet ruby red.',
        careTips: 'Pick berries daily. Enjoy them fresh off the stems for highest sugar content.',
        illustrationSeed: 'fruit_strawberry',
        heightInches: 10
      }
    ]
  },
  {
    id: 'spinach',
    name: 'Spinach',
    scientificName: 'Spinacia oleracea',
    category: 'Vegetable',
    description: 'Nutritious green superfood. Spinach appreciates the cooler seasons and consistent sub-surface hydration, preventing early leaf bitterness.',
    climbingFrameRequired: false,
    shadeRequirement: 'Partial Shade',
    waterConsumption: 'Moderate',
    waterGallonsPerWeekLocal: 2.5,
    daysToHarvest: 42,
    daysToSprout: 6,
    recommendedPlantingSeason: 'Cool seasons (Early Autumn or Early Spring)',
    earthboxLayout: {
      rows: 2,
      plantsPerRow: 4,
      totalPlants: 8,
      fertilizerBand: 'center',
      diagramPoints: [
        { x: 15, y: 25 },
        { x: 38, y: 25 },
        { x: 62, y: 25 },
        { x: 85, y: 25 },
        { x: 15, y: 75 },
        { x: 38, y: 75 },
        { x: 62, y: 75 },
        { x: 85, y: 75 }
      ],
      instructions: 'Plant 8 fast spinach starters. Keeps growth rapid, crisp, and high-yielding.'
    },
    stages: [
      {
        dayRange: [1, 8],
        name: 'Double Strap',
        description: 'Very long, narrow, thin grass-like seed leaves unfold.',
        careTips: 'Keep damp. Soil should remain loose and highly breathable.',
        illustrationSeed: 'cot_spinach',
        heightInches: 1.2
      },
      {
        dayRange: [9, 20],
        name: 'Serrated Greens',
        description: 'Signature crinkled, broad true spinach leaves emerge from the rosette core.',
        careTips: 'Clip away any tiny weed competitors. High soil nitrogen supports rich leaves.',
        illustrationSeed: 'veg_spinach',
        heightInches: 3.5
      },
      {
        dayRange: [21, 32],
        name: 'Foliage Swell',
        description: 'A tight rosette of layered edible leaves develops, ideal for continuous baby clipping.',
        careTips: 'Pick outer leaves to prolong production. Do not disturb the central crown buds.',
        illustrationSeed: 'flower_spinach',
        heightInches: 6
      },
      {
        dayRange: [33, 42],
        name: 'Heavy Harvesting',
        description: 'Large, dark-green crinkly spade leaves. Harvest before stems elongate towards seed bolting.',
        careTips: 'Cut whole clump near soil surface or outer leaves as needed for immediate salads.',
        illustrationSeed: 'fruit_spinach',
        heightInches: 8
      }
    ]
  },
  {
    id: 'sugar_snap_peas',
    name: 'Sugar Snap Peas',
    scientificName: 'Pisum sativum var. macrocarpon',
    category: 'Vegetable',
    description: 'Crisp, climbing pea pods incredibly sweet and productive. Excellent for container setups with a frame.',
    climbingFrameRequired: true,
    climbingFrameType: 'Pea trellis climbing netting or standard wire grid framework',
    shadeRequirement: 'Full Sun',
    waterConsumption: 'Moderate',
    waterGallonsPerWeekLocal: 3.5,
    daysToHarvest: 58,
    daysToSprout: 6,
    recommendedPlantingSeason: 'Early Spring or Late Summer',
    earthboxLayout: {
      rows: 2,
      plantsPerRow: 4,
      totalPlants: 8,
      fertilizerBand: 'center',
      diagramPoints: [
        { x: 15, y: 25 },
        { x: 38, y: 25 },
        { x: 62, y: 25 },
        { x: 85, y: 25 },
        { x: 15, y: 75 },
        { x: 38, y: 75 },
        { x: 62, y: 75 },
        { x: 85, y: 75 }
      ],
      instructions: 'Plant 8 pea seeds. Provide climbing netting immediately so tendrils can latch.'
    },
    stages: [
      {
        dayRange: [1, 8],
        name: 'Pea Loop',
        description: 'Heavy round peas push up pale green, tightly coiled leaf shoots.',
        careTips: 'Keep birds away from fresh shoots. Keep soil consistently moist.',
        illustrationSeed: 'cot_peas',
        heightInches: 3
      },
      {
        dayRange: [9, 24],
        name: 'Climbing Vines',
        description: 'Slender green stalks extend upwards, unfurling hair-like grip tendrils.',
        careTips: 'Position the first tendrils onto your trellis netting to train their pattern.',
        illustrationSeed: 'veg_peas',
        heightInches: 12
      },
      {
        dayRange: [25, 42],
        name: 'Orchid Blooms',
        description: 'Delicate, butterfly-shaped white blossoms emerge in pairs along the vine joints.',
        careTips: 'Watch out for heavy wind gusts; make sure trellis supports are well anchored.',
        illustrationSeed: 'flower_peas',
        heightInches: 26
      },
      {
        dayRange: [43, 58],
        name: 'Snapping Pods',
        description: 'Shiny cylindrical pods swell with juicy sweet round peas. Eat raw, pod and all.',
        careTips: 'Pick regularly. Over-mature pods grow fiber lines and cause vines to decline.',
        illustrationSeed: 'fruit_peas',
        heightInches: 45
      }
    ]
  },
  {
    id: 'cilantro',
    name: 'Cilantro',
    scientificName: 'Coriandrum sativum',
    category: 'Herb',
    description: 'A beautiful, highly aromatic herb perfect for pico de gallo, curries, and summer dishes. Loves cooling water reservoirs.',
    climbingFrameRequired: false,
    shadeRequirement: 'Partial Shade',
    waterConsumption: 'Moderate',
    waterGallonsPerWeekLocal: 2.8,
    daysToHarvest: 45,
    daysToSprout: 6,
    recommendedPlantingSeason: 'Spring or Late Summer/Autumn',
    earthboxLayout: {
      rows: 2,
      plantsPerRow: 3,
      totalPlants: 6,
      fertilizerBand: 'center',
      diagramPoints: [
        { x: 20, y: 25 },
        { x: 50, y: 25 },
        { x: 80, y: 25 },
        { x: 20, y: 75 },
        { x: 50, y: 75 },
        { x: 80, y: 75 }
      ],
      instructions: 'Plant 6 cilantro starts in two parallel rows. Keep fertilizer band exactly down the center.'
    },
    stages: [
      {
        dayRange: [1, 8],
        name: 'Lacy Wing',
        description: 'Thin delicate seed leaves pop up, soon unfolding lace-edged true leaves.',
        careTips: 'Enjoys partial shade on hot dry days to prevent early heat shock.',
        illustrationSeed: 'cot_cilantro',
        heightInches: 1
      },
      {
        dayRange: [9, 22],
        name: 'Tooth Leaf',
        description: 'Fragrant toothed leaves develop, growing into compact layered rosettes.',
        careTips: 'Harvest individual outer leaves regularly to stimulate fresh core shoots.',
        illustrationSeed: 'veg_cilantro',
        heightInches: 4.5
      },
      {
        dayRange: [23, 35],
        name: 'Aromatic Shrub',
        description: 'Stems multiply, creating a fluffy and pungent light green mound of fine foliage.',
        careTips: 'Pinch back fast central shoot starts if they try to bolt into tall white flowers.',
        illustrationSeed: 'flower_cilantro',
        heightInches: 10
      },
      {
        dayRange: [36, 45],
        name: 'Continuous Sprigs',
        description: 'A mature cilantro masterpiece, ready for regular trimming. Highly flavorful.',
        careTips: 'Trim complete stalks from the base to keep foliage producing.',
        illustrationSeed: 'fruit_cilantro',
        heightInches: 15
      }
    ]
  },
  {
    id: 'bok_choy',
    name: 'Bok Choy',
    scientificName: 'Brassica rapa subsp. chinensis',
    category: 'Vegetable',
    description: 'An exceptionally delicious, crisp, fast-growing brassica. Highly responsive to bottom sub-irrigation water supplies, forming tender mild green leaf clusters with thick pearly white stems.',
    climbingFrameRequired: false,
    shadeRequirement: 'Partial Shade',
    waterConsumption: 'Moderate',
    waterGallonsPerWeekLocal: 3.2,
    daysToHarvest: 45,
    daysToSprout: 5,
    recommendedPlantingSeason: 'Spring and Autumn (Enjoys cool weather)',
    earthboxLayout: {
      rows: 2,
      plantsPerRow: 4,
      totalPlants: 8,
      fertilizerBand: 'center',
      diagramPoints: [
        { x: 15, y: 25 },
        { x: 38, y: 25 },
        { x: 62, y: 25 },
        { x: 85, y: 25 },
        { x: 15, y: 75 },
        { x: 38, y: 75 },
        { x: 62, y: 75 },
        { x: 85, y: 75 }
      ],
      instructions: 'Plant 8 Bok Choy starts in two rows of four. Pour the solid fertilizer cover band perfectly centered between the rows.'
    },
    stages: [
      {
        dayRange: [1, 7],
        name: 'Pearly Sprout',
        description: 'Fleshy, heart-shaped green cotyledons emerge on pale, crisp stalks.',
        careTips: 'Protect from slugs and flea beetles early. Ensure indirect or morning light.',
        illustrationSeed: 'cot_bok_choy',
        heightInches: 1.5
      },
      {
        dayRange: [8, 20],
        name: 'Spoon Stage',
        description: 'Glossy spoon-like true leaves fan out. The rosette base begins to gather.',
        careTips: 'Keep reservoir levels consistent. Do not pour water over central foliage.',
        illustrationSeed: 'veg_bok_choy',
        heightInches: 4.5
      },
      {
        dayRange: [21, 35],
        name: 'Fleshy Rosette',
        description: 'Stems thicken, turning ivory-white and packing tightly together at the ground level.',
        careTips: 'You can begin harvesting outer leaves for soups while waiting for head maturity.',
        illustrationSeed: 'flower_bok_choy',
        heightInches: 8
      },
      {
        dayRange: [36, 45],
        name: 'Crisp Head Maturity',
        description: 'A handsome, fully-formed, vase-shaped head with crispy, succulent white ribs and deep green leaves.',
        careTips: 'Harvest the entire plant by cutting at the root collar. Highly tender and delicious!',
        illustrationSeed: 'fruit_bok_choy',
        heightInches: 12
      }
    ]
  },
  {
    id: 'tuscan_kale',
    name: 'Tuscan Kale',
    scientificName: 'Brassica oleracea var. palmifolia',
    category: 'Vegetable',
    description: 'An ultimate Italian heirloom brassica, also known as Lacinato Kale or Cavolo Nero. Famously rugged, frost-hardy, and packed with vitamins. It produces dark blue-green blistered spear-shaped leaves.',
    climbingFrameRequired: false,
    shadeRequirement: 'Full Sun',
    waterConsumption: 'High',
    waterGallonsPerWeekLocal: 4.0,
    daysToHarvest: 60,
    daysToSprout: 6,
    recommendedPlantingSeason: 'Spring to Autumn',
    earthboxLayout: {
      rows: 1,
      plantsPerRow: 3,
      totalPlants: 3,
      fertilizerBand: 'side',
      diagramPoints: [
        { x: 20, y: 50 },
        { x: 50, y: 50 },
        { x: 80, y: 50 }
      ],
      instructions: 'Grow 3 kale plants positioned in a central horizontal row. This gives leaves room to spread. Place fertilizer on the opposite side of the water pipe.'
    },
    stages: [
      {
        dayRange: [1, 8],
        name: 'St sturdy Seedling',
        description: 'Robust, purple-tinged seedlings push upward with rounded seed leaves.',
        careTips: 'Provide rich direct lighting. Keep soil surrounding the crown well aerated.',
        illustrationSeed: 'cot_kale',
        heightInches: 2.0
      },
      {
        dayRange: [9, 25],
        name: 'Lancelot Ribs',
        description: 'Deep blue-green spear leaves rise with noticeable crinkles and light leaf curling.',
        careTips: 'Feed with high nitrogen organic solution if lower leaves turn yellowish.',
        illustrationSeed: 'veg_kale',
        heightInches: 7
      },
      {
        dayRange: [26, 45],
        name: 'Prickly Canopy',
        description: 'Highly puckered (blistered) long strap leaves mature into a robust rosette resembling a mini palm tree.',
        careTips: 'Harvest lower mature leaves relative to needs, encouraging new rosette spears to rise at top core.',
        illustrationSeed: 'flower_kale',
        heightInches: 14
      },
      {
        dayRange: [46, 60],
        name: 'Cavolo Nero Harvest',
        description: 'Tall, sculptural forest-green palm crown. Highly sweet, especially after experiencing cool frost nights.',
        careTips: 'Clip leaves continuously. The plant continues to thrive and produce throughout winter.',
        illustrationSeed: 'fruit_kale',
        heightInches: 24
      }
    ]
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    scientificName: 'Brassica oleracea var. italica',
    category: 'Vegetable',
    description: 'A stellar, high-density heading brassica that excels in sub-irrigation boxes. Requires consistent nutrient bands to develop magnificent, heavy flowery green main crowns followed by delicious sweet side shoots.',
    climbingFrameRequired: false,
    shadeRequirement: 'Full Sun',
    waterConsumption: 'High',
    waterGallonsPerWeekLocal: 4.5,
    daysToHarvest: 70,
    daysToSprout: 6,
    recommendedPlantingSeason: 'Early Spring or Late Summer',
    earthboxLayout: {
      rows: 1,
      plantsPerRow: 3,
      totalPlants: 3,
      fertilizerBand: 'side',
      diagramPoints: [
        { x: 20, y: 50 },
        { x: 50, y: 50 },
        { x: 80, y: 50 }
      ],
      instructions: 'Plant exactly 3 broccoli starts in a single horizontal row. They grow quite wide. Place the fertilizer band along the longer side margin.'
    },
    stages: [
      {
        dayRange: [1, 8],
        name: 'Blue Sprout',
        description: 'Broad blue-tinted seed leaves arise on fleshy stalks.',
        careTips: 'Keep damp. Soil must remain cool and breathable for proper head initiation.',
        illustrationSeed: 'cot_broccoli',
        heightInches: 2.0
      },
      {
        dayRange: [9, 28],
        name: 'Giant Shields',
        description: 'Huge, fan-like waxy leaves branch out, shading the container floor to retain moisture.',
        careTips: 'Check for green cabbage worms under leaves. Keep sub-irrigation well fully topped off.',
        illustrationSeed: 'veg_broccoli',
        heightInches: 8
      },
      {
        dayRange: [29, 52],
        name: 'Crown Button',
        description: 'The green primary crown button becomes visible deep inside the heart of the central foliage.',
        careTips: 'Keep fertilizer lines clean. High water intake is vital to sustain button swelling.',
        illustrationSeed: 'flower_broccoli',
        heightInches: 15
      },
      {
        dayRange: [53, 70],
        name: 'Swell Harvesting',
        description: 'A majestic, compact, tight blue-green central broccoli crown ready for kitchen prep.',
        careTips: 'Cut the main stem at an angle, 6 inches down. Keep watering to trigger sweet side shoots!',
        illustrationSeed: 'fruit_broccoli',
        heightInches: 22
      }
    ]
  },
  {
    id: 'thyme',
    name: 'Thyme',
    scientificName: 'Thymus vulgaris',
    category: 'Herb',
    description: 'A classic, incredibly aromatic, hardy dwarf perennial herb. Perfect for dry rub culinary seasonings. Thrives in highly drained potting mix and requires very low maintenance.',
    climbingFrameRequired: false,
    shadeRequirement: 'Full Sun',
    waterConsumption: 'Low',
    waterGallonsPerWeekLocal: 1.8,
    daysToHarvest: 60,
    daysToSprout: 10,
    recommendedPlantingSeason: 'Spring and Summer',
    earthboxLayout: {
      rows: 2,
      plantsPerRow: 3,
      totalPlants: 6,
      fertilizerBand: 'center',
      diagramPoints: [
        { x: 20, y: 25 },
        { x: 50, y: 25 },
        { x: 80, y: 25 },
        { x: 20, y: 75 },
        { x: 50, y: 75 },
        { x: 80, y: 75 }
      ],
      instructions: 'Plant 6 thyme starts. Place the slow-release fertilizer strip down the center.'
    },
    stages: [
      {
        dayRange: [1, 12],
        name: 'Dwarf Shoot',
        description: 'Extremely microscopic double-leaf starts break the soil cover.',
        careTips: 'Requires patience. Water gently from above with a fine mist sprayer.',
        illustrationSeed: 'cot_thyme',
        heightInches: 0.5
      },
      {
        dayRange: [13, 30],
        name: 'Trailing Sprigs',
        description: 'Slender, wiry stems multiply, carrying tiny, pointed grey-green leaves.',
        careTips: 'Provide max sunshine. Avoid overwatering; thyme roots seek aerobic balance.',
        illustrationSeed: 'veg_thyme',
        heightInches: 2.5
      },
      {
        dayRange: [31, 48],
        name: 'Aromatic Tuft',
        description: 'Forms a tight, highly aromatic, bushy green tuft that begins to trailing over container sides.',
        careTips: 'Pinch top branch tips to encourage lateral branching and dense growth.',
        illustrationSeed: 'flower_thyme',
        heightInches: 5.0
      },
      {
        dayRange: [49, 60],
        name: 'Matured Timber',
        description: 'Dense, woody herbal sprigs full of high-essential-oil miniature leaves. Beautiful and productive.',
        careTips: 'Clip sprigs regularly for continuous kitchen use. Leave at least 3 inches of regrowth.',
        illustrationSeed: 'fruit_thyme',
        heightInches: 8.0
      }
    ]
  },
  {
    id: 'oregano',
    name: 'Oregano',
    scientificName: 'Origanum vulgare',
    category: 'Herb',
    description: 'An indispensable Mediterranean herb famous for flavoring Italian sauces and Greek salads. Incredibly flavorful, producing a trailing fragrant groundcover that loves warmth.',
    climbingFrameRequired: false,
    shadeRequirement: 'Full Sun',
    waterConsumption: 'Low',
    waterGallonsPerWeekLocal: 2.0,
    daysToHarvest: 55,
    daysToSprout: 9,
    recommendedPlantingSeason: 'Spring and Summer',
    earthboxLayout: {
      rows: 2,
      plantsPerRow: 3,
      totalPlants: 6,
      fertilizerBand: 'center',
      diagramPoints: [
        { x: 20, y: 25 },
        { x: 50, y: 25 },
        { x: 80, y: 25 },
        { x: 20, y: 75 },
        { x: 50, y: 75 },
        { x: 80, y: 75 }
      ],
      instructions: 'Plant 6 starter starts. Their root systems will network well to search moisture reserves.'
    },
    stages: [
      {
        dayRange: [1, 10],
        name: 'Oval Shoot',
        description: 'Tiny oval seed leaves covered in microscopic fuzzy hairs appear.',
        careTips: 'Warm soil is crucial. Keep young seedlings sheltered from hard winds.',
        illustrationSeed: 'cot_oregano',
        heightInches: 0.8
      },
      {
        dayRange: [11, 28],
        name: 'Fuzzy Branch',
        description: 'Stems extend, displaying opposite pairs of fuzzy dark green leaves with heavy aromatherapy metrics.',
        careTips: 'Do not overfeed. A lean soil profile makes oregano oils taste hotter and sweeter.',
        illustrationSeed: 'veg_oregano',
        heightInches: 3.5
      },
      {
        dayRange: [29, 44],
        name: 'Bush Spilling',
        description: 'The clump expands into a cascading, lush mound of dense, aromatic green foliage.',
        careTips: 'Lightly shear back outer trails to encourage dense central leaf clustering.',
        illustrationSeed: 'flower_oregano',
        heightInches: 6.0
      },
      {
        dayRange: [45, 55],
        name: 'Harvesting Spiciness',
        description: 'A matured oregano shrub ready for harvesting. High concentrations of carvacrol deliver premium warmth.',
        careTips: 'Cut stems in the morning after dew dries for the absolute peak flavor concentration.',
        illustrationSeed: 'fruit_oregano',
        heightInches: 10.0
      }
    ]
  },
  {
    id: 'mint',
    name: 'Mint',
    scientificName: 'Mentha',
    category: 'Herb',
    description: 'Crisp, incredibly invasive, fast-growing mint. Best grown separately in a dedicated sub-irrigation planter to avoid runner roots from crowding out other crops. Excellent for tea or cocktails.',
    climbingFrameRequired: false,
    shadeRequirement: 'Partial Shade',
    waterConsumption: 'High',
    waterGallonsPerWeekLocal: 3.5,
    daysToHarvest: 50,
    daysToSprout: 8,
    recommendedPlantingSeason: 'Spring to Autumn',
    earthboxLayout: {
      rows: 1,
      plantsPerRow: 2,
      totalPlants: 2,
      fertilizerBand: 'side',
      diagramPoints: [
        { x: 25, y: 50 },
        { x: 75, y: 50 }
      ],
      instructions: 'Plant exactly 2 mint starts. They will rapidly multiply and completely colonize the soil layer.'
    },
    stages: [
      {
        dayRange: [1, 9],
        name: 'Fragrant Hook',
        description: 'Serrated tiny leaves rise, giving off a subtle cooling clean aroma from the get-go.',
        careTips: 'Keep soil moist but well drained. Avoid direct mid-day baking sun.',
        illustrationSeed: 'cot_mint',
        heightInches: 1.0
      },
      {
        dayRange: [10, 25],
        name: 'Runner Creep',
        description: 'Roots send out horizontal sub-surface runners (stolons) that shoot up brand-new stalks rapidly.',
        careTips: 'Snip runner tips extending beyond box limits to keep energy focused.',
        illustrationSeed: 'veg_mint',
        heightInches: 5.0
      },
      {
        dayRange: [26, 40],
        name: 'Pungent Forest',
        description: 'A dense, sweet-smelling, rich mint green canopy fills the box surface completely.',
        careTips: 'Pinch off any flower spikes to prevent leaves from growing tough and losing flavor.',
        illustrationSeed: 'flower_mint',
        heightInches: 11.0
      },
      {
        dayRange: [41, 50],
        name: 'Sweet Harvesting',
        description: 'An absolute abundance of refreshing mint stalks, ready for continuous cut-and-come-again harvesting.',
        careTips: 'Cut down whole stems to 1 inch above soil; they will jump back with new growth immediately.',
        illustrationSeed: 'fruit_mint',
        heightInches: 18.0
      }
    ]
  }
];
