## Git workflow

0. Be anywhere in the local git repository
1. `git fetch origin`
2. `git checkout -b my_feature origin/master`
3. Develop the feature
4. `git checkout master`
5. `git fetch origin`
6. `git reset --hard origin/master`
7. `git merge my_feature`
8. `git push origin`