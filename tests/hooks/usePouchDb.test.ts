import { act, renderHook, waitFor } from "@testing-library/react";
import PouchDB from "pouchdb";
import memory from "pouchdb-adapter-memory";
import { afterEach, beforeEach, describe, vi } from "vitest";

import usePouchDb from "../../src/hooks/usePouchDb";

PouchDB.plugin(memory);

let myPouch: PouchDB.Database;

type TestDocument = {
  _id: string;
  _rev?: string;
  name: string;
};

describe("usePouchDb", () => {
  beforeEach(() => {
    myPouch = new PouchDB("test", { adapter: "memory" });
  });

  afterEach(async () => {
    await myPouch.destroy();
  });

  it("should initialize loading state to false", async () => {
    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));
    expect(result.current.loading).toBe(false);
  });

  it("should initialize error state to null", async () => {
    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));
    expect(result.current.error).toBe(null);
  });

  it("should fetch documents from the database", async () => {
    const testDocuments = [
      { _id: "1", name: "John" },
      { _id: "2", name: "Jane" },
    ];
    await myPouch.bulkDocs(testDocuments);

    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));

    let fetchedDocs: TestDocument[] = [];
    await act(async () => {
      fetchedDocs = await result.current.fetchDocs();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(fetchedDocs).toHaveLength(testDocuments.length);
    expect(fetchedDocs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _id: "1", name: "John" }),
        expect.objectContaining({ _id: "2", name: "Jane" }),
      ]),
    );
  });

  it("should update loading state correctly in fetchDocs function", async () => {
    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));

    act(() => {
      result.current.fetchDocs();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("should add a document to the database", async () => {
    const documentToAdd = { _id: "3", name: "Bob" };
    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));

    await act(async () => {
      const addedDoc = await result.current.addDoc(documentToAdd);
      expect(addedDoc).toEqual(expect.objectContaining(documentToAdd));
    });
  });

  it("should update a document in the database and return the new rev", async () => {
    const initialDoc = { _id: "1", name: "John Doe" } as TestDocument;
    await myPouch.put(initialDoc);

    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));

    const updatedData = { _id: initialDoc._id, name: "John Doe Jr." };

    await act(async () => {
      const updatedDoc = await result.current.updateDoc(updatedData);

      expect(updatedDoc._id).toBe(updatedData._id);
      expect(updatedDoc.name).toBe(updatedData.name);
      expect(updatedDoc._rev).not.toBe(initialDoc._rev);
    });
  });

  it("should delete a document from the database", async () => {
    const initialDoc = { _id: "1", name: "John Doe" };
    await myPouch.put(initialDoc);

    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));

    await act(async () => {
      await result.current.deleteDoc(initialDoc._id);
    });

    expect(myPouch.get(initialDoc._id)).rejects.toThrow();
  });

  it("should handle error if fetchDocs fails", async () => {
    vi.spyOn(myPouch, "allDocs").mockRejectedValue(new Error("Test error"));

    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));

    await act(async () => {
      try {
        await result.current.fetchDocs();
      } catch (error) {}
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Test error");
  });

  it("should handle error if addDoc fails", async () => {
    vi.spyOn(myPouch, "put").mockRejectedValue(new Error("Test error"));

    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));

    await act(async () => {
      try {
        await result.current.addDoc({ _id: "3", name: "Bob" });
      } catch (error) {}
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Test error");
  });

  it("should handle error if updateDoc fails", async () => {
    const initialDoc = { _id: "1", name: "John Doe" } as TestDocument;
    await myPouch.put(initialDoc);

    vi.spyOn(myPouch, "put").mockRejectedValue(new Error("Test error"));

    const { result } = renderHook(() => usePouchDb<TestDocument>(myPouch));

    await act(async () => {
      try {
        await result.current.updateDoc(initialDoc);
      } catch (error) {}
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Test error");
  });
});
