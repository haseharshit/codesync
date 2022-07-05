#include <bits/stdc++.h>
using namespace std;
void solve()
{
    int n, m;
    cin >> n >> m;
    vector<vector<int>> mat(n, vector<int>(m, -1));
    string a = "1 0 ", b = "0 1 ";
    for (int i = 0; i < n; i += 1)
    {
        if (i % 2 == 0)
        {
            swap(a, b);
        }
        for (int j = 0; j < m / 2; j += 1)
        {

            if ((i + j) & 1)
            {
                cout << b;
            }
            else
            {
                cout << a;
            }
        }
        cout << endl;
    }
}
int main()
{
cout<<"Hi";
return 0;
}