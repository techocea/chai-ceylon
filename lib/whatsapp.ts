export function openWhatsApp(phone = "94724388956", option: string) {
  const msg =
    `Hi Chai Ceylon team,\n\nI'm interested in your "${option}" package for my business.\nPlease send me the pricing and next steps.\n\nBest regards,\nEnter your name.`.trim();

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}
