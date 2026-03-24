"""
Конвертация PNG/JPG → WebP с сохранением нейминга
Установка зависимостей: pip install Pillow
Запуск: python compress_images.py --folder ./images
"""

import argparse
from pathlib import Path
from PIL import Image

SUPPORTED = {".png", ".jpg", ".jpeg"}


def convert_to_webp(folder: Path, quality: int = 85) -> None:
    files = [f for f in folder.rglob("*") if f.suffix.lower() in SUPPORTED]

    if not files:
        print("Картинки не найдены.")
        return

    print(f"Найдено файлов: {len(files)}\n")

    for img_path in files:
        output_path = img_path.with_suffix(".webp")

        try:
            with Image.open(img_path) as img:
                # Конвертируем RGBA→RGB если нужно (для JPG)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGBA")
                else:
                    img = img.convert("RGB")

                img.save(output_path, "WEBP", quality=quality, method=6)

            original_size = img_path.stat().st_size / 1024
            new_size = output_path.stat().st_size / 1024
            saved = 100 - (new_size / original_size * 100)

            print(f"✓ {img_path.name} → {output_path.name}")
            print(f"  {original_size:.0f} КБ → {new_size:.0f} КБ  (−{saved:.0f}%)\n")

        except Exception as e:
            print(f"✗ Ошибка: {img_path.name} — {e}\n")

    print("Готово! Оригиналы не удалены.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="PNG/JPG → WebP конвертер")
    parser.add_argument(
        "--folder",
        type=Path,
        default=Path("."),
        help="Папка с картинками (по умолчанию — текущая)",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=85,
        help="Качество WebP от 1 до 100 (по умолчанию 85)",
    )
    args = parser.parse_args()

    if not args.folder.exists():
        print(f"Папка не найдена: {args.folder}")
    else:
        convert_to_webp(args.folder, args.quality)
