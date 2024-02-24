// index file for all our layout components

import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import Header from "./header";

const Layout = ({ children }: React.PropsWithChildren) => (
  <ThemedLayoutV2
    Header={Header}
    Title={(titleProps) => <ThemedTitleV2 {...titleProps} text="CSIR" />}
  >
    {children}
  </ThemedLayoutV2>
);

export default Layout;
