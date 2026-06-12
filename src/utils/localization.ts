export function isUSPostcode(postcode: string = ''): boolean {
  const clean = postcode.trim();
  // US ZIP is 5 digits, or 5-4 digits
  return /^\d{5}(-\d{4})?$/.test(clean);
}

/**
 * Get display temperature unit and value based on ZIP/postcode
 * If US postcode, keep Fahrenheit. If UK / alphanumeric, convert to Centigrade (Celsius).
 */
export function getDisplayTemp(tempF: number, postcode: string = ''): { value: number; unit: string; formatted: string } {
  if (isUSPostcode(postcode)) {
    return {
      value: tempF,
      unit: '°F',
      formatted: `${tempF}°F`
    };
  } else {
    // Convert Fahrenheit to Centigrade (Celsius)
    const tempC = Math.round((tempF - 32) * 5 / 9);
    return {
      value: tempC,
      unit: '°C',
      formatted: `${tempC}°C`
    };
  }
}

/**
 * Translate general temperature terms or values inside string messages
 */
export function localizeMessage(message: string, postcode: string = ''): string {
  if (isUSPostcode(postcode)) {
    return message; // Keep original US wording & Fahrenheit
  }

  // Else, convert any Fahrenheit pattern (\d+°F) to Celsius (\d+°C) in string logs/alerts!
  return message.replace(/(\d+)\s*°F/gi, (match, p1) => {
    const fVal = parseInt(p1, 10);
    const cVal = Math.round((fVal - 32) * 5 / 9);
    return `${cVal}°C`;
  }).replace(/eggplant/gi, 'aubergine')
    .replace(/bell pepper/gi, 'sweet pepper')
    .replace(/romaine lettuce/gi, 'cos lettuce')
    .replace(/bush green bean/gi, 'dwarf French bean')
    .replace(/green bean/gi, 'French bean')
    .replace(/cilantro/gi, 'coriander')
    .replace(/jalapeno pepper/gi, 'jalapeno chilli')
    .replace(/beefsteak tomato/gi, 'beefsteak/slicing tomato')
    .replace(/bok choy/gi, 'pak choi')
    .replace(/tuscan kale/gi, 'cavolo nero');
}

/**
 * Map of plant name translations from US (id/defaults) to British
 */
const PLANT_NAME_TRANSLATIONS: Record<string, { us: string; uk: string }> = {
  cherry_tomato: { us: 'Cherry Tomato', uk: 'Cherry Tomato' },
  bell_pepper: { us: 'Bell Pepper', uk: 'Sweet Pepper' },
  slicing_cucumber: { us: 'Slicing Cucumber', uk: 'Slicing Cucumber' },
  sweet_basil: { us: 'Sweet Basil', uk: 'Sweet Basil' },
  japanese_eggplant: { us: 'Japanese Eggplant', uk: 'Japanese Aubergine' },
  romaine_lettuce: { us: 'Romaine Lettuce', uk: 'Cos Lettuce' },
  bush_beans: { us: 'Bush Green Beans', uk: 'Dwarf French Beans' },
  beefsteak_tomato: { us: 'Beefsteak Tomato', uk: 'Beefsteak/Slicing Tomato' },
  jalapeno_pepper: { us: 'Jalapeno Pepper', uk: 'Jalapeno Chilli' },
  cilantro: { us: 'Cilantro', uk: 'Coriander' },
  spinach: { us: 'Spinach', uk: 'Spinach' },
  strawberry: { us: 'Strawberry', uk: 'Strawberry' },
  sugar_snap_peas: { us: 'Sugar Snap Peas', uk: 'Sugar Snap Peas' },
  bok_choy: { us: 'Bok Choy', uk: 'Pak Choi' },
  tuscan_kale: { us: 'Tuscan Kale', uk: 'Cavolo Nero' },
  broccoli: { us: 'Broccoli', uk: 'Broccoli' },
  thyme: { us: 'Thyme', uk: 'Thyme' },
  oregano: { us: 'Oregano', uk: 'Oregano' },
  mint: { us: 'Mint', uk: 'Mint' }
};

/**
 * Translate a plant's name based on ID and postcode
 */
export function getLocalPlantName(plantId: string, postcode: string = '', fallbackName: string = ''): string {
  const translation = PLANT_NAME_TRANSLATIONS[plantId];
  if (!translation) {
    // If not found, run generic localizer on fallback
    return localizeMessage(fallbackName, postcode);
  }
  return isUSPostcode(postcode) ? translation.us : translation.uk;
}
