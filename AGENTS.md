<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project architecture
- Keep the College Management Portal modules isolated under `src/components/college-portal/` and expose them through `/college`; this preserves their independent role-based state and avoids coupling them to Zenith HR state.
- Keep the Governing Body & Executive Management modules isolated under `src/components/governance/` and expose them through `/governance`; this keeps their leadership state separate while sharing Zenith's application shell.
- Keep the Marketing, Admissions & PR modules isolated under `src/components/marketing-pr/` and expose them through `/marketing`; this preserves its role workspaces while sharing Zenith's application shell.
