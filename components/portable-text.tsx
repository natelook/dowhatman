import BlockContent, {
  PortableTextProps,
  PortableTextSerializers,
} from '@sanity/block-content-to-react';

export default function createPortableTextComponent({
  projectId,
  dataset,
  serializers,
}: {
  projectId: string;
  dataset: string;
  serializers: PortableTextSerializers;
}) {
  return function PortableText(props: PortableTextProps) {
    return (
      <BlockContent
        projectId={projectId}
        dataset={dataset}
        serializers={serializers}
        {...props}
      />
    );
  };
}
