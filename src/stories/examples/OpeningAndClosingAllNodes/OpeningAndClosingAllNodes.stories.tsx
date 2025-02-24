import { Meta } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";
import { pageFactory } from "~/stories/pageFactory";
import * as argTypes from "~/stories/argTypes";
import { Tree } from "~/Tree";
import { TreeProps } from "~/types";
import { FileProperties } from "~/stories/types";
import { interactionsDisabled } from "~/stories/examples/interactionsDisabled";
import { Template } from "./Template";
import sampleData from "~/stories/assets/sample-default.json";
import styles from "./OpeningAndClosingAllNodes.module.css";

export default {
  component: Tree,
  title: "Examples/Tree/Opening and closing all nodes",
  argTypes,
} as Meta<TreeProps<FileProperties>>;

export const OpeningAndClosingAllNodesStory = Template.bind({});

OpeningAndClosingAllNodesStory.args = {
  rootId: 0,
  tree: sampleData,
  classes: {
    root: styles.treeRoot,
    draggingSource: styles.draggingSource,
    dropTarget: styles.dropTarget,
  },
};

OpeningAndClosingAllNodesStory.storyName = "Opening and closing all nodes";

OpeningAndClosingAllNodesStory.parameters = {
  docs: {
    page: pageFactory({
      jsId: "opening-and-closing-all-nodes-js-eqxzti",
      tsId: "opening-and-closing-all-nodes-ts-xeb5v4",
    }),
  },
};

if (!interactionsDisabled) {
  OpeningAndClosingAllNodesStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.queryByText("File 1-2")).toBeNull();

    const btnOpenAll = canvas.getByTestId("btn-open-all");
    const btnCloseAll = canvas.getByTestId("btn-close-all");

    userEvent.click(btnOpenAll);

    expect(await canvas.findByText("File 1-2")).toBeInTheDocument();
    expect(await canvas.findByText("File 2-1-1")).toBeInTheDocument();

    userEvent.click(btnCloseAll);

    expect(canvas.queryByText("File 1-2")).toBeNull();
    expect(canvas.queryByText("File 2-1-1")).toBeNull();
  };
}
