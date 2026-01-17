/**
 * CUISINE LAB - Unit Tests
 * Run this in the browser console or include in test.html
 */

const tests = {
    // Mock Data
    mockData: [
        { country: 'Japan', region: 'asia', name: { en: 'Sushi', native: '寿司', ja: '寿司' } },
        { country: 'USA', region: 'americas', name: { en: 'Burger', native: 'Burger', ja: 'ハンバーガー' } },
        { country: 'Italy', region: 'europe', name: { en: 'Pizza', native: 'Pizza', ja: 'ピザ' } }
    ],

    // Mock Filter Logic (Simplified version of app.js logic)
    filter(data, term, region) {
        return data.filter(item => {
            if (region !== 'all' && item.region !== region) return false;
            if (term) {
                const t = term.toLowerCase();
                return item.country.toLowerCase().includes(t) ||
                    item.name.en.toLowerCase().includes(t) ||
                    item.name.native.toLowerCase().includes(t) ||
                    item.name.ja.toLowerCase().includes(t);
            }
            return true;
        });
    },

    run() {
        console.log('--- Running Tests ---');
        let passed = 0;
        let failed = 0;

        const assert = (desc, condition) => {
            if (condition) {
                console.log(`✅ PASS: ${desc}`);
                passed++;
            } else {
                console.error(`❌ FAIL: ${desc}`);
                failed++;
            }
        };

        // Test 1: Region Filtering
        const asia = this.filter(this.mockData, '', 'asia');
        assert('Filter Asia returns 1 item', asia.length === 1 && asia[0].country === 'Japan');

        // Test 2: Search by Country Name
        const usa = this.filter(this.mockData, 'usa', 'all');
        assert('Search "usa" returns USA', usa.length === 1 && usa[0].country === 'USA');

        // Test 3: Search by Dish Name
        const pizza = this.filter(this.mockData, 'pizza', 'all');
        assert('Search "pizza" returns Italy', pizza.length === 1 && pizza[0].country === 'Italy');

        // Test 4: Combined Filter
        const mixed = this.filter(this.mockData, 'japan', 'europe');
        assert('Search "japan" in region "europe" returns 0', mixed.length === 0);

        // Test 5: Japanese Search
        const jp = this.filter(this.mockData, '寿司', 'all');
        assert('Search "寿司" returns Japan', jp.length === 1 && jp[0].country === 'Japan');

        console.log(`--- Results: ${passed} Passed, ${failed} Failed ---`);
        return failed === 0;
    }
};

// Auto-run if loaded
if (typeof window !== 'undefined') {
    tests.run();
}
