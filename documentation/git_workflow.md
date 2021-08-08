## Git workflow

0. Be anywhere in the local git repository
1. `git fetch origin`
2. `git checkout -b my_feature`
3. `git reset --hard origin/master`
4. Develop the feature
5. `git checkout master`
6. `git fetch origin`
7. `git reset --hard origin/master`
8. `git merge my_feature`
9. `git push origin`
10. `git branch -d my_feature`
11. `git push -d origin my_feature`