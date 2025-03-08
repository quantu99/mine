import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];
// Lại đây và anh sẽ kể em nghe một câu chuyện. Là câu chuyện cổ tích về loài hoa Cúc họa mi, hay còn được gọi với cái tên  là Daisy
export default eslintConfig;
