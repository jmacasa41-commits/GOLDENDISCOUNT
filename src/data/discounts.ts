import { UtensilsCrossed, ShoppingCart, Plane, Theater, Pill, ShoppingBag } from "lucide-react";

export interface Discount {
    id: string;
    businessName: string;
    discount: string;
    distance?: string; // Original display string
    lat: number;
    lng: number;
    category: string;
    mechanics: string;
}

export const discounts: Record<string, Discount[]> = {
    restaurants: [
        {
            id: "1",
            businessName: "Jollibee",
            discount: "20% off for Senior Citizens",
            distance: "0.3 km",
            lat: 14.5995,
            lng: 120.9842,
            category: "restaurants",
            mechanics: "How to avail: Present a valid senior citizen ID at the counter before payment. Eligibility: Customers aged 60 and above. Conditions: Valid for dine-in and take-out only. Limitations: Not applicable to delivery and cannot be combined with other promos.",
        },
        {
            id: "2",
            businessName: "Max's Restaurant",
            discount: "20% off all meals for 60+",
            distance: "0.8 km",
            lat: 14.5900,
            lng: 120.9800,
            category: "restaurants",
            mechanics: "How to avail: Inform the cashier you are availing the senior discount and show your senior ID. Eligibility: 60+ with valid government-issued or senior citizen ID. Conditions: Applies to regular-priced food items only. Limitations: Not valid with set meals, party packages, or other discounts.",
        },
        {
            id: "3",
            businessName: "Mang Inasal",
            discount: "20% off for seniors",
            distance: "1.2 km",
            lat: 14.6000,
            lng: 120.9900,
            category: "restaurants",
            mechanics: "How to avail: Present your senior citizen ID when ordering. Eligibility: Seniors aged 60 and above. Conditions: Discount applies to one regular meal per senior per visit. Limitations: Not valid for group meals, delivery, or online orders.",
        },
        {
            id: "4",
            businessName: "Goldilocks",
            discount: "20% off cakes & pastries for 60+",
            distance: "1.5 km",
            lat: 14.5800,
            lng: 120.9850,
            category: "restaurants",
            mechanics: "How to avail: Show your senior citizen ID at the cashier before paying. Eligibility: Seniors aged 60+ with valid ID. Conditions: Applies to regular-priced cakes and pastries. Limitations: Not applicable to bundles, party trays, or already discounted items.",
        },
        {
            id: "5",
            businessName: "Chowking",
            discount: "20% off for Senior Citizens",
            distance: "0.5 km",
            lat: 14.5950,
            lng: 120.9820,
            category: "restaurants",
            mechanics: "How to avail: Mention the senior discount and present your ID upon ordering. Eligibility: 60+ with valid senior or government ID. Conditions: Valid for regularly priced solo meals. Limitations: Excludes delivery, promos, and group bundles.",
        },
    ],
    groceries: [
        {
            id: "6",
            businessName: "SM Supermarket",
            discount: "5% off + 20% SC discount",
            distance: "1.0 km",
            lat: 14.5850,
            lng: 120.9850,
            category: "groceries",
            mechanics: "How to avail: Present your senior ID at the checkout counter. Eligibility: Seniors aged 60+ with valid ID. Conditions: 20% senior discount applies to eligible basic necessities; 5% store promo may apply on select days. Limitations: Some items such as liquor, tobacco, and non-essential goods may be excluded.",
        },
        {
            id: "7",
            businessName: "Puregold",
            discount: "20% off for seniors daily",
            distance: "0.6 km",
            lat: 14.5920,
            lng: 120.9830,
            category: "groceries",
            mechanics: "How to avail: Show your senior citizen ID before payment. Eligibility: Customers 60 years old and above. Conditions: Applies to qualified grocery items only. Limitations: Not valid with wholesale pricing, special sale events, or other discount cards.",
        },
        {
            id: "8",
            businessName: "Robinsons Supermarket",
            discount: "20% SC discount on groceries",
            distance: "1.8 km",
            lat: 14.5750,
            lng: 120.9880,
            category: "groceries",
            mechanics: "How to avail: Present a valid senior ID at the customer counter or cashier. Eligibility: Seniors aged 60+ recognized by law. Conditions: Discount applies to qualifying food and medicine items. Limitations: Limited to a maximum purchase amount per day as set by the store.",
        },
        {
            id: "9",
            businessName: "Metro Supermarket",
            discount: "20% off for 60+ on all items",
            distance: "2.0 km",
            lat: 14.6100,
            lng: 120.9900,
            category: "groceries",
            mechanics: "How to avail: Inform the cashier you are a senior and present your ID. Eligibility: Seniors aged 60 and above. Conditions: Applies to regular-priced items at participating branches. Limitations: Not valid on already discounted goods, gift certificates, or services.",
        },
    ],
    travel: [
        {
            id: "10",
            businessName: "Philippine Airlines",
            discount: "20% off domestic flights for 60+",
            distance: "NAIA",
            lat: 14.5081,
            lng: 121.0196,
            category: "travel",
            mechanics: "How to avail: Book at official ticket offices and present your senior ID. Eligibility: Filipino citizens aged 60+ with valid ID. Conditions: Discount applies to base fare for domestic flights only. Limitations: Taxes, surcharges, and add-ons are not discounted.",
        },
        {
            id: "11",
            businessName: "Cebu Pacific",
            discount: "20% senior discount on base fare",
            distance: "NAIA",
            lat: 14.5090,
            lng: 121.0200,
            category: "travel",
            mechanics: "How to avail: Provide your senior details when booking and show your ID at check-in. Eligibility: Seniors 60+ with valid Philippine-issued senior ID. Conditions: Valid for domestic flights and regular fares. Limitations: Excludes web-only promo fares and non-fare charges.",
        },
        {
            id: "12",
            businessName: "2GO Travel",
            discount: "20% off ferry tickets for seniors",
            distance: "Manila Port",
            lat: 14.5770,
            lng: 120.9500,
            category: "travel",
            mechanics: "How to avail: Buy tickets at accredited counters and present your senior ID. Eligibility: 60+ with valid senior or OSCA ID. Conditions: Applies to passenger fares on domestic routes. Limitations: Does not cover port fees, insurance, or optional services.",
        },
        {
            id: "13",
            businessName: "Victory Liner",
            discount: "20% off bus fare for 60+",
            distance: "Cubao Terminal",
            lat: 14.6180,
            lng: 121.0500,
            category: "travel",
            mechanics: "How to avail: Show your senior ID when purchasing your bus ticket. Eligibility: Seniors aged 60+ with valid identification. Conditions: Valid on regular provincial routes. Limitations: Not valid on special trips, charters, or promo fares.",
        },
    ],
    entertainment: [
        {
            id: "14",
            businessName: "SM Cinema",
            discount: "20% off movie tickets for 60+",
            distance: "1.0 km",
            lat: 14.5855,
            lng: 120.9855,
            category: "entertainment",
            mechanics: "How to avail: Present your senior citizen ID at the ticket counter. Eligibility: Seniors aged 60+. Conditions: Valid for regular 2D screenings at participating branches. Limitations: Not applicable to IMAX, special screenings, or online bookings unless specified.",
        },
        {
            id: "15",
            businessName: "Ayala Cinemas",
            discount: "20% senior discount on tickets",
            distance: "2.5 km",
            lat: 14.5500,
            lng: 121.0200,
            category: "entertainment",
            mechanics: "How to avail: Buy tickets at the cinema counter and show your senior ID. Eligibility: Seniors aged 60+ with valid ID. Conditions: Applies to standard movie tickets. Limitations: Not valid with premiere seats, 3D add-ons, or bundled snacks.",
        },
        {
            id: "16",
            businessName: "National Museum",
            discount: "Free admission for all",
            distance: "Manila",
            lat: 14.5869,
            lng: 120.9812,
            category: "entertainment",
            mechanics: "How to avail: Proceed to the entrance; no payment required. Eligibility: Open to all visitors including seniors. Conditions: Standard visiting hours and museum rules apply. Limitations: Special exhibits or guided tours may have separate fees.",
        },
        {
            id: "17",
            businessName: "Ocean Park Manila",
            discount: "20% off entrance for seniors",
            distance: "5.0 km",
            lat: 14.5794,
            lng: 120.9726,
            category: "entertainment",
            mechanics: "How to avail: Present your senior ID at the ticket booth before purchase. Eligibility: 60+ with valid senior citizen ID. Conditions: Discount applies to regular entrance tickets. Limitations: Not valid for packages, shows, or add-on attractions.",
        },
    ],
    healthcare: [
        {
            id: "18",
            businessName: "Mercury Drug",
            discount: "20% off medicines for 60+",
            distance: "0.2 km",
            lat: 14.5980,
            lng: 120.9840,
            category: "healthcare",
            mechanics: "How to avail: Present your senior ID together with the prescription at checkout. Eligibility: Seniors aged 60+ with valid ID. Conditions: Applies to eligible prescription and maintenance medicines. Limitations: Some over-the-counter items and cosmetics may not be covered.",
        },
        {
            id: "19",
            businessName: "Watsons",
            discount: "20% SC discount on medicines",
            distance: "0.4 km",
            lat: 14.5970,
            lng: 120.9850,
            category: "healthcare",
            mechanics: "How to avail: Show your senior ID and prescription (if required) at the cashier. Eligibility: Seniors aged 60 and above. Conditions: Discount applies to qualified medicines and health essentials. Limitations: Not valid with Watsons member-exclusive promo bundles.",
        },
        {
            id: "20",
            businessName: "The Generics Pharmacy",
            discount: "20% off + additional 5% for seniors",
            distance: "0.5 km",
            lat: 14.5960,
            lng: 120.9830,
            category: "healthcare",
            mechanics: "How to avail: Present a valid senior citizen ID during purchase. Eligibility: Seniors 60+. Conditions: 20% mandatory senior discount plus 5% store promo on selected generic medicines. Limitations: Additional 5% may be limited to specific brands or schedules.",
        },
        {
            id: "21",
            businessName: "Rose Pharmacy",
            discount: "20% off prescriptions for 60+",
            distance: "0.8 km",
            lat: 14.5900,
            lng: 120.9810,
            category: "healthcare",
            mechanics: "How to avail: Show your senior ID along with a valid prescription. Eligibility: Seniors aged 60+ with proper documentation. Conditions: Applies to prescription medicines included in the senior discount list. Limitations: Cosmetic and non-medicinal items are excluded.",
        },
    ],
    shopping: [
        {
            id: "22",
            businessName: "SM Department Store",
            discount: "20% off on senior days",
            distance: "1.0 km",
            lat: 14.5852,
            lng: 120.9852,
            category: "shopping",
            mechanics: "How to avail: Visit during announced senior days and present your senior ID at checkout. Eligibility: Seniors aged 60+. Conditions: Applies to regular-priced clothing, shoes, and selected home items. Limitations: Not valid on electronics, appliances, or items already on sale.",
        },
        {
            id: "23",
            businessName: "Robinsons Department Store",
            discount: "20% SC discount storewide",
            distance: "1.5 km",
            lat: 14.5760,
            lng: 120.9890,
            category: "shopping",
            mechanics: "How to avail: Present your senior ID before payment. Eligibility: Seniors aged 60+ with valid ID. Conditions: Discount applied to participating storewide items. Limitations: Designer brands, gadgets, and consigned items may be excluded.",
        },
        {
            id: "24",
            businessName: "Landmark",
            discount: "20% off for seniors daily",
            distance: "2.0 km",
            lat: 14.5520,
            lng: 121.0230,
            category: "shopping",
            mechanics: "How to avail: Show your senior citizen ID at the cash register. Eligibility: 60+ with proper identification. Conditions: Available on regular-priced fashion and household items. Limitations: Not valid with special sale events or loyalty point redemptions.",
        },
        {
            id: "25",
            businessName: "Handyman",
            discount: "20% off hardware items for 60+",
            distance: "1.2 km",
            lat: 14.6000,
            lng: 121.0000,
            category: "shopping",
            mechanics: "How to avail: Present your senior ID at the cashier before your bill is processed. Eligibility: Seniors aged 60+. Conditions: Applies to eligible tools, hardware, and home improvement items. Limitations: Power tools on promo, clearance items, and services may be excluded.",
        },
    ],
};

export const categoryThemes: Record<string, { icon: any, color: string, title: string }> = {
    restaurants: { icon: UtensilsCrossed, color: "hsl(0, 70%, 55%)", title: "Restaurants" },
    groceries: { icon: ShoppingCart, color: "hsl(142, 50%, 45%)", title: "Groceries" },
    travel: { icon: Plane, color: "hsl(210, 70%, 50%)", title: "Travel" },
    entertainment: { icon: Theater, color: "hsl(280, 60%, 50%)", title: "Entertainment" },
    healthcare: { icon: Pill, color: "hsl(340, 65%, 55%)", title: "Healthcare" },
    shopping: { icon: ShoppingBag, color: "hsl(42, 65%, 50%)", title: "Shopping" },
};

// Senior‑friendly, non-discount promos per business, shown only inside the selected category
export const categoryPromoDetails: Record<
    string,
    {
        businessName: string;
        promo: string;
        mechanics: string[];
    }[]
> = {
    restaurants: [
        {
            businessName: "Jollibee",
            promo: "Free regular drink with meal",
            mechanics: ["Present Senior Citizen ID.", "Dine-in only."],
        },
        {
            businessName: "Max's Restaurant",
            promo: "Free soup of the day",
            mechanics: ["Valid with any main meal.", "Senior must be present."],
        },
        {
            businessName: "Mang Inasal",
            promo: "Free extra rice",
            mechanics: ["Valid for dine-in orders only."],
        },
        {
            businessName: "Goldilocks",
            promo: "Free coffee with cake purchase",
            mechanics: ["In-store purchase only.", "Limited to one per visit."],
        },
        {
            businessName: "Chowking",
            promo: "Free upgrade to larger drink",
            mechanics: ["Valid with regular meal orders."],
        },
    ],
    groceries: [
        {
            businessName: "SM Supermarket",
            promo: "Priority lane for senior citizens",
            mechanics: ["Present Senior Citizen ID at checkout."],
        },
        {
            businessName: "Puregold",
            promo: "Free eco bag on selected purchase days",
            mechanics: ["Available while supplies last."],
        },
        {
            businessName: "Robinsons Supermarket",
            promo: "Assisted shopping for seniors",
            mechanics: ["Request assistance at customer service."],
        },
        {
            businessName: "Metro Supermarket",
            promo: "Early shopping hours for seniors",
            mechanics: ["Valid during designated morning hours."],
        },
    ],
    travel: [
        {
            businessName: "Philippine Airlines",
            promo: "Priority boarding for seniors",
            mechanics: ["Inform staff and present Senior Citizen ID."],
        },
        {
            businessName: "Cebu Pacific",
            promo: "Free seat selection assistance",
            mechanics: ["Request help during check-in."],
        },
        {
            businessName: "2GO Travel",
            promo: "Priority seating for seniors",
            mechanics: ["Subject to availability."],
        },
        {
            businessName: "Victory Liner",
            promo: "Reserved senior seating",
            mechanics: ["First-come, first-served basis."],
        },
    ],
    entertainment: [
        {
            businessName: "SM Cinema",
            promo: "Priority entry lane for seniors",
            mechanics: ["Present Senior Citizen ID."],
        },
        {
            businessName: "Ayala Cinemas",
            promo: "Free use of senior-friendly seating",
            mechanics: ["Subject to availability."],
        },
        {
            businessName: "National Museum",
            promo: "Guided tour assistance for seniors",
            mechanics: ["Request at the information desk."],
        },
        {
            businessName: "Ocean Park Manila",
            promo: "Free use of wheelchair service",
            mechanics: ["Available upon request."],
        },
    ],
    healthcare: [
        {
            businessName: "Mercury Drug",
            promo: "Medicine purchase assistance",
            mechanics: ["Ask for pharmacist support."],
        },
        {
            businessName: "Watsons",
            promo: "Free basic health consultation days",
            mechanics: ["Available on selected schedules."],
        },
        {
            businessName: "The Generics Pharmacy",
            promo: "Free blood pressure check",
            mechanics: ["Walk-in seniors only."],
        },
        {
            businessName: "Rose Pharmacy",
            promo: "Priority service for seniors",
            mechanics: ["Present Senior Citizen ID."],
        },
    ],
    shopping: [
        {
            businessName: "SM Department Store",
            promo: "Priority billing lane",
            mechanics: ["Valid for senior citizens only."],
        },
        {
            businessName: "Robinsons Department Store",
            promo: "Free gift wrapping service",
            mechanics: ["Available upon request."],
        },
        {
            businessName: "Landmark",
            promo: "Assisted shopping support",
            mechanics: ["Request help at customer service."],
        },
        {
            businessName: "Handyman",
            promo: "Free item carry assistance",
            mechanics: ["Available for bulky items."],
        },
    ],
};
