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

- Keep the five DSA Journey sections as TanStack file-based routes and share the app shell; this preserves the framework's SSR routing and metadata conventions.
- Store personal tracker data through the local-storage service and keep roadmap data and progress calculations separate; this keeps V1 backend-free and makes later storage replacement straightforward.
