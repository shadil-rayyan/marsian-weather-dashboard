// app/api/mock-mars-weather/route.js
export async function GET() {
    return new Response(
      JSON.stringify({
        sol_keys: ['259', '260', '261', '262', '263', '264', '265'],
        '259': {
          AT: { av: 5 },
          PRE: { av: 740 },
          HWS: { av: 15 }
        },
        '260': {
          AT: { av: 7 },
          PRE: { av: 730 },
          HWS: { av: 12 }
        },
        '261': {
          AT: { av: -2 },
          PRE: { av: 760 },
          HWS: { av: 20 }
        },
        '262': {
          AT: { av: 3 },
          PRE: { av: 750 },
          HWS: { av: 18 }
        },
        '263': {
          AT: { av: 4 },
          PRE: { av: 740 },
          HWS: { av: 14 }
        },
        '264': {
          AT: { av: 6 },
          PRE: { av: 735 },
          HWS: { av: 16 }
        },
        '265': {
          AT: { av: 2 },
          PRE: { av: 745 },
          HWS: { av: 12 }
        },
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  