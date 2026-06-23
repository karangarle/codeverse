import JsxVisualizer from "./JsxVisualizer";
import PropsVisualizer from "./PropsVisualizer";
import UseStateVisualizer from "./UseStateVisualizer";
import NodeVisualizer from "./NodeVisualizer";
import ExpressVisualizer from "./ExpressVisualizer";
import ArrayVisualizer from "./ArrayVisualizer";
import LinkedListVisualizer from "./LinkedListVisualizer";

interface TopicVisualizerProps {
  slug: string;
}

export default function TopicVisualizer({ slug }: TopicVisualizerProps) {
  switch (slug) {
    case "intro-to-jsx":
      return <JsxVisualizer />;
    case "components-and-props":
      return <PropsVisualizer />;
    case "use-state-hook":
      return <UseStateVisualizer />;
    case "how-nodejs-works":
      return <NodeVisualizer />;
    case "rest-api-express":
      return <ExpressVisualizer />;
    case "arrays-foundation":
      return <ArrayVisualizer />;
    case "linked-lists":
      return <LinkedListVisualizer />;
    default:
      return null;
  }
}
