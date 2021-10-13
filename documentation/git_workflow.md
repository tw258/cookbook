## Git workflow

0. Be anywhere in the local git repository
1. `git checkout -b my_feature`
2. `git fetch origin`
3. `git reset --hard origin/master`
4. Develop the feature (add, commit and push as usual)
5. `git rebase -i HEAD~<count_commits>` in textfile: earliest commit: `r` (rename), subsequent `f` (fixup). second textfile: enter commit message
6. `git checkout master`
7. `git fetch origin`
8. `git reset --hard origin/master`
9. `git merge my_feature`
10. `git push origin`
11. Optional: `git branch --delete my_feature`
12. Optional: `git push --delete origin my_feature`
