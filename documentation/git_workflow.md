## Git workflow

0. Be anywhere in the local git repository
1. `git checkout -b my_feature`
2. `git fetch origin`
3. `git reset --hard origin/master`
4. Develop the feature (add, commit and push as usual)
5. `git checkout master`
6. `git fetch origin`
7. `git reset --hard origin/master`
8. `git merge my_feature`
9. `git push origin`
10. Optional: `git branch --delete my_feature`
11. Optional: `git push --delete origin my_feature`
