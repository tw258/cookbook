# Git workflow

1. Be in local master branch
2. `git fetch origin`
3. `git checkout -b my_feature origin/master`
4. Develop the feature
5. `git checkout master`
6. `git reset --hard origin/master`
7. `git merge myFeature`
8. `git push origin/master`