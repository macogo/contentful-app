import React, { useEffect } from "react";
import { Button } from '@contentful/f36-components';
import { ExternalLinkIcon } from '@contentful/f36-icons';
import { SidebarExtensionSDK } from "@contentful/app-sdk";

interface SidebarProps {
  sdk: SidebarExtensionSDK;
  ENVURL: string
}

const URLMAPPING: { [key: string]: any } = {
  'productDetail': {
    uri: 'product/detail/?itemNumber=',
    query: 'productId'
  },
  'page': {
    query: 'urlSlug'
  },
};

const Sidebar = (props: SidebarProps) => {
  const { sdk, ENVURL } = props;
  const { contentType } = sdk.ids || {};
  const obj = URLMAPPING[contentType];
  const href = `${ENVURL}${obj?.uri || ''}${sdk.entry.fields[obj?.query]?.getValue()}`;

  useEffect(() => {
    sdk.window.startAutoResizer();
    return () => {
      sdk.window.stopAutoResizer();
    };
  }, [sdk.window]);

  return (
    <Button as="a" href={href} target="_blank" variant="primary" startIcon={<ExternalLinkIcon />} isFullWidth>
      View live page
    </Button>
  );
};
export default Sidebar;
