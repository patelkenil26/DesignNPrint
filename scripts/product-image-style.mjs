/**
 * Shared finishing for every product "type" photo so the whole catalogue feels like one premium set.
 * Each prompt file describes only the scene; `shot()` appends the common photography + safety rules.
 */
const photographyTail =
  'Subject centred with generous margin on all sides, so the picture crops safely on phones, tablets and wide desktop screens. ' +
  'Magazine-quality premium commercial product photography, rich refined colour grade, crisp print, foil and material detail, soft diffused key light with a gentle warm rim light, natural contact shadows, shallow depth of field, no CGI look, no watermark. ' +
  'Any printed text is fully legible and correctly spelled exactly as quoted; all other text is blurred or purely abstract. ' +
  'Indian context: prices use the rupee sign ₹ (never dollars, pounds or euros), phone numbers are Indian (+91 …), addresses are in Gujarat or other Indian cities. ' +
  'All brands, businesses and people are entirely fictional: no real brands, no copied logos, no real people. 4:3 landscape.';

export const shot = (scene) => `${scene.trim()} ${photographyTail}`;
