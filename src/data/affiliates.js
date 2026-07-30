const niches = ['Fitness', 'Parenting', 'Tech', 'Finance', 'Beauty', 'Travel', 'Food', 'Gaming', 'Fashion', 'Health'];
const firstNames = ['Emma','Liam','Olivia','Noah','Ava','James','Sophia','Oliver','Mia','Lucas'];
const lastNames = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Martinez','Hernandez'];

function random(min,max) { return Math.floor(Math.random()*(max-min+1))+min; }

function generateAffiliates(count = 100) {
  const result = [];
  for (let i = 1; i <= count; i++) {
    const revenue = random(200000, 5000000);
    const months = random(12, 36);
    const monthlyAvg = Math.round(revenue / months);
    const growthCurve = Array.from({ length: 12 }, (_, idx) => 
      Math.round(monthlyAvg * (0.7 + 0.6 * (idx / 11)))
    );
    result.push({
      id: i,
      name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      niche: niches[i % niches.length],
      revenue,
      monthsActive: months,
      rating: (3 + Math.random() * 2).toFixed(1),
      minDeposit: revenue > 3000000 ? 1000 : revenue > 1500000 ? 500 : 200,
      growthCurve,
      avatar: `https://i.pravatar.cc/150?img=${i}`,
      followers: random(5000, 120000),
      products: [`Product ${String.fromCharCode(65 + (i % 5))}`, `Product ${String.fromCharCode(70 + (i % 4))}`]
    });
  }
  return result;
}

export const affiliates = generateAffiliates();
