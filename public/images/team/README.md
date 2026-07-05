# Team photos

Place team member headshots here. The app looks for these files (all lowercase):

| File              | Team member       |
|-------------------|-------------------|
| `nyel.jpg`        | Nyel Umair        |
| `aayan.jpg`       | Aayan Jafri       |
| `ammaar.png`      | Ammaar Ishtiaq    |
| `umair.jpg`       | Umair Shaheen     |
| `amaar.jpeg`      | Amaar Chughtai    |

Any member whose `photo_url` is set in the admin panel will use that URL instead of these files. Add new photos here and extend the `PHOTO_FALLBACKS` map in `src/components/home/TeamPreview.jsx` to match.
