import type { ComponentProps } from "react";

type Props = ComponentProps<"a"> & {
  marketplaceId: string;
  marketplaceName: string;
  platform?: string;
  productId?: string;
  productName?: string;
};

/**
 * Ссылка на площадку (Ozon, WB и т.д.). Клики по ней попадают в аналитику админки.
 * Используйте на страницах «Где купить» и в карточках продуктов.
 */
export function MarketplaceLink({
  marketplaceId,
  marketplaceName,
  platform,
  productId,
  productName,
  ...rest
}: Props) {
  return (
    <a
      data-analytics="marketplace"
      data-marketplace-id={marketplaceId}
      data-marketplace-name={marketplaceName}
      data-platform={platform}
      data-product-id={productId}
      data-product-name={productName}
      {...rest}
    />
  );
}
