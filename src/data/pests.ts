export interface DiagnosticIssue {
  id: string;
  name: string;
  category: 'pest' | 'disease' | 'environmental';
  description: string;
  symptoms: string[];
  targetCrops: string[]; // crop IDs e.g. 'cherry_tomato', 'japanese_eggplant'
  organicTreatment: string[];
  prevention: string[];
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  imagePlaceholderColor: string; // fallback color for scanning UI representation
}

export const EXHAUSTIVE_PEST_DISEASE_CATALOG: DiagnosticIssue[] = [
  {
    id: 'blossom_end_rot',
    name: 'Blossom End Rot',
    category: 'environmental',
    description: 'A structural physiological disorder triggered by localized calcium transport failure within fast-growing fruits. It commonly affects tomatoes, peppers, and eggplants styled in sub-irrigated systems when proper calcium buffers are missing.',
    symptoms: [
      'Dark sunken leathery patches at the bottom of the fruit',
      'Water-soaked spots on the blossom-end of maturing tomatoes or peppers',
      'Premature fruit ripening or mold on the bottom spot'
    ],
    targetCrops: ['cherry_tomato', 'bell_pepper', 'japanese_eggplant'],
    organicTreatment: [
      'Top off and stabilize the sub-irrigation reservoir daily. Uneven transpiration disrupts calcium mobility.',
      'Apply a quick-release organic soluble calcium foliar spray (like organic liquid calcium chelates) directly to the foliage in the early morning.',
      'Remove affected fruits immediately to stop the plant from wasting structural resources on spoiled yields.'
    ],
    prevention: [
      'Always pack exactly 1 to 2 cups of hydrated lime, dolomite, or agricultural gypsum into the potting medium during your initial Earthbox setup.',
      'Never mix native clay or dense compost into the Earthbox; use a lightweight, peat-coir-perlite based potting mix to ensure optimal capillary flow without stagnant compaction.'
    ],
    severity: 'Medium',
    imagePlaceholderColor: 'from-amber-700 to-zinc-900'
  },
  {
    id: 'spider_mites',
    name: 'Spider Mites Infestation',
    category: 'pest',
    description: 'Microscopic sap-sucking arachnids that multiply extensively in warm, dusty microclimates on patio garden corners.',
    symptoms: [
      'Fine silky webbing on the undersides of leaves and around tender stems',
      'Tiniest yellow-white speckling or stippling on leaf surfaces',
      'Leaves looking dry, dusty, bronzed, and dropping prematurely'
    ],
    targetCrops: ['cherry_tomato', 'slicing_cucumber', 'japanese_eggplant', 'sweet_basil', 'bush_beans'],
    organicTreatment: [
      'Blast the undersides of leaves with a high-pressure stream of cold clean water to physically break webbing and dislodge colonies.',
      'Spray affected foliage thoroughly with organic Rosemary-based oil, Neem oil, or potassium salts of fatty acids (insecticidal soap) under dim evening lighting.'
    ],
    prevention: [
      'Sprinkle or mist foliage weekly during scorching dry snaps to eliminate the hot, dry, dusty conditions spider mites thrive in.',
      'Introduce native predatory mites (Phytoseiulus persimilis) to search, patrol, and devour pest mite populations sustainably.'
    ],
    severity: 'High',
    imagePlaceholderColor: 'from-orange-500 to-yellow-700'
  },
  {
    id: 'powdery_mildew',
    name: 'Powdery Mildew Fungal Infection',
    category: 'disease',
    description: 'A prevalent airborne fungal disease that covers plant stems and leaves in a white powdery spore layer, blocking photosynthesis and arresting growth. Highly common on cucumbers leaves.',
    symptoms: [
      'White, talcum powder-like spots on leaf tops and stalks',
      'Leaves turning yellow, dry, curling upwards, and displaying brittle texture',
      'Stunted growth and severely reduced vegetable yield'
    ],
    targetCrops: ['slicing_cucumber', 'romaine_lettuce', 'japanese_eggplant', 'sweet_basil'],
    organicTreatment: [
      'Gently snip and safely bag highly infected leaves (do not toss in local compost piles to avoid recursive spore cycling).',
      'Spray leaves with a mild organic preventative mixture: 1 tablespoon potassium bicarbonate (or baking soda), 1 teaspoon organic liquid soap, mixed in 1 gallon water.',
      'Apply organic bio-fungicides containing Bacillus subtilis or organic sulfur/copper sprays.'
    ],
    prevention: [
      'Never plant Earthboxes in deep shadows. Place them in zones matching their full daylight sun parameters.',
      'Always leave exactly the recommended crop seating density. Do not crowd the box, ensuring high ambient ventilation through the branch structure.'
    ],
    severity: 'Medium',
    imagePlaceholderColor: 'from-slate-300 to-emerald-800'
  },
  {
    id: 'aphids_colony',
    name: 'Aphid Colony Outbreak',
    category: 'pest',
    description: 'Tiny soft-bodied pear-shaped insects (ranging from translucent green, yellow, to black) that pierce tender new shoots and suck out nutritious direct saps.',
    symptoms: [
      'Clusters of tiny bugs crowded on fresh growth and flower buds',
      'Curled, puckered, or stunted leaves on sweet basil or chili peppers',
      'Sticky clear syrup coating (honeydew) leading to dark black sooty mold'
    ],
    targetCrops: ['sweet_basil', 'bell_pepper', 'cherry_tomato', 'romaine_lettuce', 'bush_beans'],
    organicTreatment: [
      'Squish minor colonies by hand or wipe them off with a damp soapy cloth.',
      'Hose off plants vigorously. Then spray a 2% dilution of pure Castile soap or organic insecticidal soap directly targeting the live bugs.'
    ],
    prevention: [
      'Attract friendly beneficial predators like ladybugs, hoverflies, and lacewings by placing flowering dill or sweet alyssum near your Earthbox arrangements.',
      'Avoid overloading the Earthbox with excessive high-nitrogen liquid quick-feeders. Use the stable slow-release organic fertilizer strip instead.'
    ],
    severity: 'Low',
    imagePlaceholderColor: 'from-emerald-400 to-emerald-700'
  },
  {
    id: 'flea_beetles',
    name: 'Flea Beetles',
    category: 'pest',
    description: 'Tiny shinny black beetles that jump like fleas when disturbed. They are notorious for chewing thousands of miniature puncture holes in the leaves of eggplants and tomatoes, easily killing young seedlings.',
    symptoms: [
      'Dozens of tiny circular holes on leaf blades (shothole look)',
      'Seedling vigor drops sharply as leaves shrivel up like lace screens',
      'Tiny black bugs hopping quickly off foliage upon physical touch'
    ],
    targetCrops: ['japanese_eggplant', 'cherry_tomato', 'bell_pepper'],
    organicTreatment: [
      'Dust affected plants gently with food-grade Diatomaceous Earth (DE) in the morning when morning wood is damp for adherence. *Wear a dust mask during application.*',
      'Apply organic Spinosad or Pyrethrin sprays directly on foliage under low-wind conditions.'
    ],
    prevention: [
      'Protect fresh seedling starts using lightweight agricultural spun-bond row covers tucked firmly into the Earthbox elastic mulch cover until the plants are strong.',
      'Intercrop with companion trap crops like radishes or mustard greens nearby to steer flea beetles away from tender eggplants.'
    ],
    severity: 'High',
    imagePlaceholderColor: 'from-zinc-700 to-zinc-950'
  },
  {
    id: 'tomato_hornworm',
    name: 'Tomato Hornworm Caterpillar',
    category: 'pest',
    description: 'Giant, bright green caterpillars with seven diagonal white stripes and a signature tail horn. They devour entire stems, leaves, and green fruits overnight with high efficiency.',
    symptoms: [
      'Large chunks of main foliage, branches, or fruit eaten clean overnight',
      'Exotic dark green or black barrel-shaped droppings clustered on leaves',
      'Camouflaged stout caterpillars clinging to stems'
    ],
    targetCrops: ['cherry_tomato', 'bell_pepper', 'japanese_eggplant'],
    organicTreatment: [
      'Inspect branches and pluck the caterpillars off by hand (use heavy gloves). *Tip: Shine a UV blacklight flashlight onto your Earthbox at night—hornworms will glow in spectacular neon green!*',
      'Apply Bacillus thuringiensis (Bt subsp. kurstaki), an organic soil bacterium that safely and selectively targets chewing caterpillars without harming birds or bees.'
    ],
    prevention: [
      'Till the top 2 inches of potting mix in autumn or early spring to destroy over-wintering pupae.',
      'Sow nectar-rich companion plants nearby to support parasitic braconid wasps, which lay eggs on hornworms and act as natural bio-controls.'
    ],
    severity: 'Critical',
    imagePlaceholderColor: 'from-green-600 to-rose-650'
  },
  {
    id: 'damping_off',
    name: 'Damping Off (Pythium / Rhizoctonia Fungus)',
    category: 'disease',
    description: 'A soil-borne fungal disease that attacks newly germinated sprouts and young seedlings in overly cold, dense potting situations.',
    symptoms: [
      'Young seedlings collapsing at the exact soil line',
      'Water-soaked, pinched, or blackened stems near the soil surface',
      'Sprouts rotting before they emerge from seed covers'
    ],
    targetCrops: ['romaine_lettuce', 'sweet_basil', 'bell_pepper', 'bush_beans'],
    organicTreatment: [
      'Damping off is irreversible for collapsed individual seedlings. Immediately extract infected soil clumps and plant starts to stop the fungus from expanding.',
      'Drench surrounding healthy seedling zones with fresh organic Chamomile tea (a gentle natural fungicide) or standard organic copper-octanoate sprays.'
    ],
    prevention: [
      'Always wash and sanitize old Earthbox components with a mild vinegar or 10% bleach solution before a new planting season.',
      'Use professional sterile, lightweight potting mixes. Avoid heavy, wet, dense backyard soil composts inside the container.',
      'Keep your planter box situated in warm zones. Avoid soggy soils during deep early-spring cold waves.'
    ],
    severity: 'High',
    imagePlaceholderColor: 'from-emerald-900 to-zinc-800'
  }
];
