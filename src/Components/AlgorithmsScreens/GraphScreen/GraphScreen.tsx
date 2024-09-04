import React, { useState } from "react";
import graphicon from "/assets/sort_icon.png";
import { TopBar } from "../TopBar";
import { SideBar } from "../SideBar";
import axios from "axios";
import { GraphVisualization } from "./GraphVisualization";
import "../../../Css/GraphScreenStyle.css";
import { GraphData } from "./GraphData";

const graphfuncionality: React.FC = () => {
  return <></>;
};

const GraphScreen = () => {
  let [newNodes, setNewNodes] = useState<any[]>([]); // Assuming newNodes is an array of nodes
  let [newEdges, setNewEdges] = useState<any[]>([]); // Assuming newEdges is an array of edges

  const [selectedGraphType, setSelectedGraphType] = useState<string>("BFS");
  const graphs: string[] = ["BFS", "DFS", "Dijkstra"];
  const graphsProps = {
    text: "Graph",
    icon: graphicon,
  };

  const MemoizedGraph = React.memo(GraphVisualization);

  const handleSelectChange = (sortType: string) => {
    setSelectedGraphType(sortType);
  };

  const getComplexity = (sortType: string): string => {
    switch (sortType) {
      case "BFS":
        return "O(nodes + edges)";
      case "DFS":
        return "O(nodes + edges)";
      case "Dijkstra":
        return "O((nodes + edges)*log(nodes + edges))";
      default:
        return "Unknown Complexity";
    }
  };

  const handleGraphInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const edge = value
      .split("\n") // Split the input by new lines to get each edge
      .map((line) => {
        const [node1, node2] = line.split(",").map((item) => item.trim());
        return { node1, node2 }; // Create an edge object with node1 and node2
      })
      .filter((edge) => edge.node1 && edge.node2); // Filter out any invalid edges

    // Initialize an empty adjacency list
    const adjacencyList: Record<string, string[]> = {};

    edge.forEach((edge) => {
      if (!adjacencyList[edge.node1]) {
        adjacencyList[edge.node1] = [];
      }
      if (!adjacencyList[edge.node2]) {
        adjacencyList[edge.node2] = [];
      }
      adjacencyList[edge.node1].push(edge.node2);
      // adjacencyList[edge.node2].push(edge.node1); // Assuming an undirected graph
    });

    console.log("graphscreen:", adjacencyList);

    localStorage.setItem("graphInput", JSON.stringify(adjacencyList)); // Store the graph representation in localStorage

    const { nodes, edges } = GraphData();
    setNewNodes(nodes);
    setNewEdges(edges);
  };

  const handleVisualizeClick = async () => {
    const storedAdjacencyList = localStorage.getItem("graphInput");
    const adjacencyList = storedAdjacencyList
      ? JSON.parse(storedAdjacencyList)
      : [];
    console.log("selectedGraphType:", selectedGraphType);
    console.log("Adjacency List:", adjacencyList);

    try {
      const response = await axios.post("http://localhost:5000/api/graph", {
        array: adjacencyList,
        GraphAlgo: selectedGraphType, // Ensure this matches server-side expectation
      });
      console.log("Visited Array:", response.data.VisitedNodes);
      console.log("Snapshots:", response.data.snapshots);
    } catch (error) {
      console.error("Error during path finding:", error);
    }
  };

  return (
    <>
      <TopBar
        dropdownmenu={graphs}
        sortingsProps={graphsProps}
        handleVisualizeClick={handleVisualizeClick}
        onSelectChange={handleSelectChange}
      ></TopBar>

      <SideBar
        ArrayGenerator={graphfuncionality}
        selectedSortType={selectedGraphType}
        getComplexity={getComplexity}
        handleInputChange={handleGraphInputChange}
      ></SideBar>
      
      <div className="visualization">
        <MemoizedGraph nodes={newNodes} edges={newEdges} />
      </div>
    </>
  );
};

export { GraphScreen };
